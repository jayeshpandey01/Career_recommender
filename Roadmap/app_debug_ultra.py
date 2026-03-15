from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import traceback
import sys

app = FastAPI()

@app.exception_handler(Exception)
async def all_exception_handler(request: Request, exc: Exception):
    err_msg = traceback.format_exc()
    print("!!! CAUGHT EXCEPTION !!!")
    print(err_msg)
    with open("hard_debug.log", "a") as f:
        f.write("\n" + "="*40 + "\n")
        f.write(err_msg)
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "traceback": err_msg}
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/api/generate")
async def generate_roadmap(req: QueryRequest):
    print(f"Processing query: {req.query}")
    return {
        "success": True,
        "summary": "Success.",
        "roadmap": "Roadmap content",
        "mermaid_diagram": "graph TD\nA-->B"
    }

@app.get("/")
async def root():
    return {"status": "ok"}
