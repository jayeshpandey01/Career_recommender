from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle
from scipy import sparse
import os

app = FastAPI(title="Career Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and encoders
MODEL_PATH = "career_model_labeled.pkl"
ENCODER_PATH = "feature_encoder.pkl"
SCALER_PATH = "feature_scaler.pkl"

model = None
encoder = None
scaler = None

def load_resources():
    global model, encoder, scaler
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
        if os.path.exists(ENCODER_PATH):
            with open(ENCODER_PATH, 'rb') as f:
                encoder = pickle.load(f)
        if os.path.exists(SCALER_PATH):
            with open(SCALER_PATH, 'rb') as f:
                scaler = pickle.load(f)
        print("Resources loaded successfully")
    except Exception as e:
        print(f"Error loading resources: {e}")

load_resources()

class PredictionRequest(BaseModel):
    # Academic
    os: int
    algo: int
    prog: int
    se: int
    networks: int
    elec: int
    arch: int
    math: int
    comm: int
    
    # Skills
    work_hours: int
    logical: int
    hackathons: int
    coding: int
    public_speaking: int
    
    # Capabilities (selects)
    long_work: str
    self_learning: str
    extra_courses: str
    talent_tests: str
    olympiads: str
    reading_writing: str
    memory: str
    
    # Interests
    certifications: str
    workshops: str
    interested_subj: str
    career_area: str
    company_type: str
    book_type: str
    
    # Personality
    job_studies: str
    senior_input: str
    interested_games: str
    relationship: str
    behaviour: str
    mgmt_tech: str
    salary_work: str
    worker_type: str
    team_work: str
    introvert: str
    salary_range: str

@app.get("/")
async def root():
    return {"status": "online", "model_loaded": model is not None}

@app.post("/api/predict")
async def predict(req: PredictionRequest):
    if model is None or encoder is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model or encoders not loaded")

    try:
        # Map frontend keys to the exact names expected by the model
        input_dict = {
            'Acedamic percentage in Operating Systems': [req.os],
            'percentage in Algorithms': [req.algo],
            'Percentage in Programming Concepts': [req.prog],
            'Percentage in Software Engineering': [req.se],
            'Percentage in Computer Networks': [req.networks],
            'Percentage in Electronics Subjects': [req.elec],
            'Percentage in Computer Architecture': [req.arch],
            'Percentage in Mathematics': [req.math],
            'Percentage in Communication skills': [req.comm],
            'Hours working per day': [req.work_hours],
            'Logical quotient rating': [req.logical],
            'hackathons': [req.hackathons],
            'coding skills rating': [req.coding],
            'public speaking points': [req.public_speaking],
            'can work long time before system?': [req.long_work],
            'self-learning capability?': [req.self_learning],
            'Extra-courses did': [req.extra_courses],
            'certifications': [req.certifications],
            'workshops': [req.workshops],
            'talenttests taken?': [req.talent_tests],
            'olympiads': [req.olympiads],
            'reading and writing skills': [req.reading_writing],
            'memory capability score': [req.memory],
            'Interested subjects': [req.interested_subj],
            'interested career area ': [req.career_area],
            'Job/Higher Studies?': [req.job_studies],
            'Type of company want to settle in?': [req.company_type],
            'Taken inputs from seniors or elders': [req.senior_input],
            'interested in games': [req.interested_games],
            'Interested Type of Books': [req.book_type],
            'Salary Range Expected': [req.salary_range],
            'In a Realtionship?': [req.relationship],
            'Gentle or Tuff behaviour?': [req.behaviour],
            'Management or Technical': [req.mgmt_tech],
            'Salary/work': [req.salary_work],
            'hard/smart worker': [req.worker_type],
            'worked in teams ever?': [req.team_work],
            'Introvert': [req.introvert]
        }
        
        input_df = pd.DataFrame(input_dict)
        
        # Transform
        encoded_input = encoder.transform(input_df)
        scaled_input = scaler.transform(encoded_input)
        user_input = sparse.csr_matrix.copy(scaled_input)
        
        # Predict
        prediction = model.predict(user_input)[0]
        probabilities = model.predict_proba(user_input)[0]
        
        # Map probabilities to classes
        prob_dict = {str(cls): float(prob * 100) for cls, prob in zip(model.classes_, probabilities)}
        
        return {
            "prediction": prediction,
            "confidence": float(max(probabilities) * 100),
            "probabilities": prob_dict
        }
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8501)
