from sqlalchemy.orm import Session
from backend import crude
from backend.schemas import FeedbackCreate, FeedbackUpdate


def create_feedback(db: Session, data: FeedbackCreate):
    if not (1 <= data.rating <= 5):
        raise ValueError("Rating must be between 1 and 5")
    return crude.create_feedback(db, data)


def get_all_feedback(db: Session):
    return crude.get_all_feedback(db)


def get_feedback_by_id(db: Session, feedback_id: int):
    feedback = crude.get_feedback_by_id(db, feedback_id)
    if not feedback:
        raise ValueError(f"Feedback with id {feedback_id} not found")
    return feedback


def update_feedback(db: Session, feedback_id: int, data: FeedbackUpdate):
    if data.rating is not None and not (1 <= data.rating <= 5):
        raise ValueError("Rating must be between 1 and 5")
    updated = crude.update_feedback(db, feedback_id, data)
    if not updated:
        raise ValueError(f"Feedback with id {feedback_id} not found")
    return updated


def delete_feedback(db: Session, feedback_id: int):
    deleted = crude.delete_feedback(db, feedback_id)
    if not deleted:
        raise ValueError(f"Feedback with id {feedback_id} not found")
    return deleted


def search_feedback(db: Session, keyword=None, rating=None, program_name=None):
    return crude.search_feedback(db, keyword, rating, program_name)


def get_dashboard_stats(db: Session):
    all_feedback = crude.get_all_feedback(db)
    total = len(all_feedback)
    avg_rating = round(sum(f.rating for f in all_feedback) / total, 1) if total else 0
    recent = sorted(all_feedback, key=lambda f: f.submitted_at, reverse=True)[:5]
    return {"total": total, "avg_rating": avg_rating, "recent": recent}
