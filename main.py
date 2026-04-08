from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()  # Must be exactly 'app'

# Test route
@app.get("/")
def home():
    return {"message": "API is working!"}

# Patient model
class Patient(BaseModel):
    age: int
    conditions: list
    medications: list
    genetic_risk: float

# Recommendation endpoint
@app.post("/recommend")
def recommend(patient: Patient):
    return {
        "message": "Recommendation system working",
        "input": patient
    }
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)