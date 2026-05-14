from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from database.database import get_db
from backend import crude
from backend.schemas import FeedbackCreate, FeedbackUpdate, FeedbackResponse

router = APIRouter()


@router.post("/feedback", response_model=FeedbackResponse)
def submit_feedback(feedback: FeedbackCreate, db: Session = Depends(get_db)):
    return crude.create_feedback(db, feedback)


@router.get("/feedback", response_model=list[FeedbackResponse])
def get_all_feedback(db: Session = Depends(get_db)):
    return crude.get_all_feedback(db)


@router.get("/search", response_model=list[FeedbackResponse])
def search_feedback(
    keyword: Optional[str] = None,
    rating: Optional[int] = None,
    program_name: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return crude.search_feedback(db, keyword, rating, program_name)


@router.get("/feedback/{feedback_id}", response_model=FeedbackResponse)
def get_feedback(feedback_id: int, db: Session = Depends(get_db)):
    feedback = crude.get_feedback_by_id(db, feedback_id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback


@router.put("/feedback/{feedback_id}", response_model=FeedbackResponse)
def update_feedback(feedback_id: int, feedback: FeedbackUpdate, db: Session = Depends(get_db)):
    updated = crude.update_feedback(db, feedback_id, feedback)
    if not updated:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return updated


@router.delete("/feedback/{feedback_id}")
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    deleted = crude.delete_feedback(db, feedback_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return {"message": "Feedback deleted successfully"}
