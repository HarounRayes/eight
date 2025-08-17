import httpx
from typing import List, Dict

class ItunesSearchService:

    @staticmethod
    async def search_itunes(keyword: str) -> List[Dict]:
        url = "https://itunes.apple.com/search"
        params = {
            "term": keyword,
            # "limit": 10
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
        
        return data
