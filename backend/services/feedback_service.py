from sqlalchemy.orm import Session
from backend import crud
from backend.schemas import FeedbackCreate, FeedbackUpdate


def create_feedback(db: Session, data: FeedbackCreate):
    if not (1 <= data.rating <= 5):
        raise ValueError("Rating must be between 1 and 5")
    return crud.create_feedback(db, data)


def get_all_feedback(db: Session):
    return crud.get_all_feedback(db)


def get_feedback_by_id(db: Session, feedback_id: int):
    feedback = crud.get_feedback_by_id(db, feedback_id)
    if not feedback:
        raise ValueError(f"Feedback with id {feedback_id} not found")
    return feedback


def update_feedback(db: Session, feedback_id: int, data: FeedbackUpdate):
    if data.rating is not None and not (1 <= data.rating <= 5):
        raise ValueError("Rating must be between 1 and 5")
    updated = crud.update_feedback(db, feedback_id, data)
    if not updated:
        raise ValueError(f"Feedback with id {feedback_id} not found")
    return updated


def delete_feedback(db: Session, feedback_id: int):
    deleted = crud.delete_feedback(db, feedback_id)
    if not deleted:
        raise ValueError(f"Feedback with id {feedback_id} not found")
    return deleted


def search_feedback(db: Session, keyword=None, rating=None, program_name=None):
    return crud.search_feedback(db, keyword, rating, program_name)
