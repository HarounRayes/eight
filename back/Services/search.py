from sqlalchemy.orm import Session
from typing import List, Dict, Optional
from Models.keyword_model import Keyword
from Models.result_model import Result
from Services.iTunes_search import ItunesSearchService


class SearchService:
    def __init__(self, db: Session):
        self.db = db

    def get_or_create_keyword(self, keyword_text: str) -> Keyword:
        keyword_text = keyword_text.strip().lower()
        keyword_obj = self.db.query(Keyword).filter(Keyword.keyword.ilike(keyword_text)).first()
        if not keyword_obj:
            keyword_obj = Keyword(keyword=keyword_text)
            self.db.add(keyword_obj)
            self.db.flush()  # Get ID
        return keyword_obj

    @staticmethod
    def _safe_strip(value: Optional[str]) -> Optional[str]:
        """Strip whitespace and return None if empty."""
        if not value:
            return None
        stripped = value.strip()
        return stripped if stripped else None

    @staticmethod
    def _safe_int(value) -> Optional[int]:
        if value is None:
            return None
        try:
            return int(value)
        except (ValueError, TypeError):
            return None

    @staticmethod
    def _safe_decimal(value) -> Optional[float]:
        if value is None:
            return None
        try:
            return float(value)
        except (ValueError, TypeError):
            return None

    def save_all_results(self, keyword: Keyword, results: List[Dict]) -> List[Result]:
        """
        Save list of iTunes results to DB. Skips invalid entries.
        """
        result_objects = []
        for idx, item in enumerate(results):
            track_id = self._safe_int(item.get("trackId"))
            if track_id is None:
                continue

            try:
                result = Result(
                    keyword_id=keyword.id,
                    wrapper_type=item.get("wrapperType"),
                    kind=item.get("kind"),
                    track_id=track_id,
                    collection_id=self._safe_int(item.get("collectionId")),
                    artist_id=self._safe_int(item.get("artistId")),
                    track_name=item.get("trackName") or "Unknown Track",
                    artist_name=item.get("artistName") or "Unknown Artist",
                    collection_name=item.get("collectionName"),
                    artwork_url=self._safe_strip(item.get("artworkUrl100")),
                    preview_url=self._safe_strip(item.get("previewUrl")),
                    artist_view_url=self._safe_strip(item.get("artistViewUrl")),
                    collection_view_url=self._safe_strip(item.get("collectionViewUrl")),
                    track_view_url=self._safe_strip(item.get("trackViewUrl")),
                    collection_price=self._safe_decimal(item.get("collectionPrice")),
                    track_price=self._safe_decimal(item.get("trackPrice")),
                    currency=item.get("currency"),
                    release_date=item.get("releaseDate"),
                    primary_genre_name=item.get("primaryGenreName"),
                    track_time=self._safe_int(item.get("trackTimeMillis")),
                    track_number=self._safe_int(item.get("trackNumber")),
                    disc_number=self._safe_int(item.get("discNumber")),
                    is_streamable=item.get("isStreamable"),
                )
                result_objects.append(result)
            except Exception as e:
                print(f"Error processing result {idx}: {e}")

        if result_objects:
            try:
                self.db.bulk_save_objects(result_objects)
                self.db.flush()
            except Exception as e:
                raise

        return result_objects

    async def search_and_cache(self, keyword: str) -> Dict:
        
        keyword_clean = keyword.strip().lower()
        if not keyword_clean:
            raise ValueError("Keyword is required")

        keyword_obj = self.db.query(Keyword).filter(Keyword.keyword.ilike(keyword_clean)).first()
        if keyword_obj:
            results = [r.to_dict() for r in keyword_obj.results]
            return {
                "keyword": keyword_clean,
                "result_count": len(results),
                "data": results
            }

        try:
            raw_data = await ItunesSearchService.search_itunes(keyword_clean)
            if not raw_data:
                return {
                    "keyword": keyword_clean,
                    "result_count": 0,
                    "data": []
                }

            if isinstance(raw_data, dict):
                results_list = raw_data.get("results", [])
            elif isinstance(raw_data, list):
                results_list = raw_data
            else:
                results_list = []

            if not results_list:
                return {
                    "keyword": keyword_clean,
                    "result_count": 0,
                    "data": []
                }

            # Save keyword and results
            keyword_obj = self.get_or_create_keyword(keyword_clean)
            saved_results = self.save_all_results(keyword_obj, results_list)

            # Commit transaction
            self.db.commit()

            return {
                "keyword": keyword_clean,
                "result_count": len(saved_results),
                "data": [r.to_dict() for r in saved_results]
            }

        except Exception as e:
            self.db.rollback()
            raise ValueError("Failed to process search. Please try again.") from e