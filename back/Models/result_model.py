from sqlalchemy import Column, Integer, String, Text, DateTime, Numeric, Boolean, func
from database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    keyword_id = Column(Integer, ForeignKey("keywords.id"), nullable=False)

    # Type info
    wrapper_type = Column(String(50), nullable=True)  
    kind = Column(String(50), nullable=True)         

    # IDs
    track_id = Column(Integer, nullable=False, index=True)
    collection_id = Column(Integer, nullable=True)
    artist_id = Column(Integer, nullable=True)

    # Names
    track_name = Column(String(255), nullable=False)
    artist_name = Column(String(255), nullable=False)
    collection_name = Column(String(255), nullable=True)

    # URLs
    artwork_url = Column(Text, nullable=True)
    preview_url = Column(Text, nullable=True)
    artist_view_url = Column(Text, nullable=True)
    collection_view_url = Column(Text, nullable=True)
    track_view_url = Column(Text, nullable=True)

    # Pricing
    collection_price = Column(Numeric(10, 2), nullable=True)
    track_price = Column(Numeric(10, 2), nullable=True)
    currency = Column(String(3), nullable=True)

    # Metadata
    release_date = Column(DateTime, nullable=True)
    primary_genre_name = Column(String(100), nullable=True)
    track_time = Column(Integer, nullable=True)
    track_number = Column(Integer, nullable=True)
    disc_number = Column(Integer, nullable=True)
    is_streamable = Column(Boolean, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    keyword = relationship("Keyword", back_populates="results")

    def to_dict(self):
        return {
            "wrapper_type": self.wrapper_type,
            "kind": self.kind,
            "track_id": self.track_id,
            "collection_id": self.collection_id,
            "artist_id": self.artist_id,
            "track_name": self.track_name,
            "artist_name": self.artist_name,
            "collection_name": self.collection_name,
            "artwork_url": self.artwork_url,
            "preview_url": self.preview_url,
            "artist_view_url": self.artist_view_url,
            "collection_view_url": self.collection_view_url,
            "track_view_url": self.track_view_url,
            "collection_price": float(self.collection_price) if self.collection_price is not None else None,
            "track_price": float(self.track_price) if self.track_price is not None else None,
            "currency": self.currency,
            "release_date": self.release_date.isoformat() if self.release_date else None,
            "primary_genre_name": self.primary_genre_name,
            "track_time": self.track_time,
            "track_number": self.track_number,
            "disc_number": self.disc_number,
            "is_streamable": self.is_streamable,
        }