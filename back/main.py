from fastapi import FastAPI, Query, Depends, HTTPException
from sqlalchemy.orm import Session
from Services.search import SearchService
from database import get_db

app = FastAPI()

from Models.keyword_model import Keyword
from Models.result_model import Result
from database import Base, engine
Base.metadata.create_all(bind=engine)


@app.get("/search")
async def search_keyword(
    keyword: str,
    db: Session = Depends(get_db)
):
    service = SearchService(db)
    if not keyword:
        raise HTTPException(status_code=400, detail="Keyword cannot be empty")
    try:
        result = await service.search_and_cache(keyword)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")