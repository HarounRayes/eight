from sqlalchemy import Column, Integer, String, DateTime, func
from database import Base
from sqlalchemy.orm import relationship

class Keyword(Base):
    __tablename__ = "keywords"

    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    results = relationship("Result", back_populates="keyword")

    def __str__(self):
        return self.keyword

    def to_dict(self):
        return {
            "id": self.id,
            "keyword": self.keyword,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }