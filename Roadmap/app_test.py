from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False, # Use False for *
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/api/generate")
async def generate_roadmap(req: QueryRequest):
    return {
        "success": True,
        "summary": "This is a test summary.",
        "roadmap": "## Phase 1\nTest roadmap",
        "mermaid_diagram": "graph TD\nA-->B"
    }
