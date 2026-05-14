from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, engine
from backend import models  
from backend.routers import feedback

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Feedback Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(feedback.router)

@app.get("/")
def root():
    return {"message": "Feedback Management System API is running"}
