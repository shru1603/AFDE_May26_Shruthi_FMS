from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FeedbackCreate(BaseModel):
    participant_name: str
    program_name: str
    rating: int
    comments: Optional[str] = None


class FeedbackUpdate(BaseModel):
    participant_name: Optional[str] = None
    program_name: Optional[str] = None
    rating: Optional[int] = None
    comments: Optional[str] = None


class FeedbackResponse(BaseModel):
    feedback_id: int
    participant_name: str
    program_name: str
    rating: int
    comments: Optional[str] = None
    submitted_at: datetime

    class Config:
        from_attributes = True
