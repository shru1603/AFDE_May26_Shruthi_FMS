from sqlalchemy.orm import Session
from sqlalchemy import or_
from backend.models import Feedback
from backend.schemas import FeedbackCreate, FeedbackUpdate


def create_feedback(db: Session, feedback: FeedbackCreate):
    db_feedback = Feedback(**feedback.model_dump())
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def get_all_feedback(db: Session):
    return db.query(Feedback).all()


def get_feedback_by_id(db: Session, feedback_id: int):
    return db.query(Feedback).filter(Feedback.feedback_id == feedback_id).first()


def update_feedback(db: Session, feedback_id: int, feedback: FeedbackUpdate):
    db_feedback = db.query(Feedback).filter(Feedback.feedback_id == feedback_id).first()
    if not db_feedback:
        return None
    for key, value in feedback.model_dump(exclude_unset=True).items():
        setattr(db_feedback, key, value)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def delete_feedback(db: Session, feedback_id: int):
    db_feedback = db.query(Feedback).filter(Feedback.feedback_id == feedback_id).first()
    if not db_feedback:
        return None
    db.delete(db_feedback)
    db.commit()
    return db_feedback


def search_feedback(db: Session, keyword=None, rating=None, program_name=None):
    query = db.query(Feedback)
    if keyword:
        query = query.filter(
            or_(
                Feedback.participant_name.ilike(f"%{keyword}%"),
                Feedback.comments.ilike(f"%{keyword}%"),
                Feedback.program_name.ilike(f"%{keyword}%")
            )
        )
    if rating:
        query = query.filter(Feedback.rating == rating)
    if program_name:
        query = query.filter(Feedback.program_name.ilike(f"%{program_name}%"))
    return query.all()
