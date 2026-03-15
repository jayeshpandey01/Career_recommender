from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import traceback

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/api/generate")
async def generate_roadmap(req: QueryRequest):
    print(f"GOT QUERY: {req.query}")
    return {"status": "success"}

@app.get("/")
async def root():
    return {"hello": "world"}
