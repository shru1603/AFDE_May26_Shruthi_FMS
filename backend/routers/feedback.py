from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from database.database import get_db
from backend.services import feedback_service
from backend.schemas import FeedbackCreate, FeedbackUpdate, FeedbackResponse

router = APIRouter()


@router.post("/feedback", response_model=FeedbackResponse)
def submit_feedback(feedback: FeedbackCreate, db: Session = Depends(get_db)):
    try:
        return feedback_service.create_feedback(db, feedback)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/feedback", response_model=list[FeedbackResponse])
def get_all_feedback(db: Session = Depends(get_db)):
    return feedback_service.get_all_feedback(db)


@router.get("/search", response_model=list[FeedbackResponse])
def search_feedback(
    keyword: Optional[str] = None,
    rating: Optional[int] = None,
    program_name: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return feedback_service.search_feedback(db, keyword, rating, program_name)


@router.get("/feedback/{feedback_id}", response_model=FeedbackResponse)
def get_feedback(feedback_id: int, db: Session = Depends(get_db)):
    try:
        return feedback_service.get_feedback_by_id(db, feedback_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.put("/feedback/{feedback_id}", response_model=FeedbackResponse)
def update_feedback(feedback_id: int, feedback: FeedbackUpdate, db: Session = Depends(get_db)):
    try:
        return feedback_service.update_feedback(db, feedback_id, feedback)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/feedback/{feedback_id}")
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    try:
        feedback_service.delete_feedback(db, feedback_id)
        return {"message": "Feedback deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
