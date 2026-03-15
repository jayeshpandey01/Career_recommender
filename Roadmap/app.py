import json
import os
import sys
import traceback
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route, Mount
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

# Add src to path
sys.path.append(os.path.abspath("src"))

# Import the LangGraph workflow
from ollama_deep_researcher.graph import graph
from langchain_core.runnables import RunnableConfig

async def generate_roadmap(request):
    try:
        # Parse body
        body = await request.json()
        query = body.get("query", "")
        
        if not query:
            return JSONResponse({"success": False, "detail": "Missing query"}, status_code=400)

        # Define input state
        initial_state = {"research_topic": query}
        
        # Configure settings for execution
        config = RunnableConfig(
            configurable={
                "search_api": "duckduckgo",
                "max_web_research_loops": 1,
                "generate_roadmap": True,
                "generate_mermaid_diagram": True,
                "llm_provider": "ollama",
                "local_llm": "llama3.2:1b"
            }
        )
        
        # Run graph
        print(f"Starting research for: {query}")
        result = graph.invoke(initial_state, config)
        
        return JSONResponse({
            "success": True,
            "summary": result.get("running_summary", ""),
            "roadmap": result.get("roadmap", ""),
            "mermaid_diagram": result.get("mermaid_diagram", "")
        })
        
    except Exception as e:
        err_msg = traceback.format_exc()
        print(f"Error occurred: {err_msg}")
        return JSONResponse({"success": False, "detail": str(e), "traceback": err_msg}, status_code=500)

async def root(request):
    return JSONResponse({"status": "ok", "backend": "connected"})

routes = [
    Route("/", root),
    Route("/api/generate", generate_roadmap, methods=["POST"]),
]

# Add static files if directory exists
if os.path.exists("frontend"):
    routes.append(Mount("/", app=StaticFiles(directory="frontend", html=True), name="frontend"))

# Middleware - Explicitly allow the React origin
middleware = [
    Middleware(CORSMiddleware, 
               allow_origins=["*"], 
               allow_credentials=False,
               allow_methods=["*"], 
               allow_headers=["*"])
]

app = Starlette(debug=True, routes=routes, middleware=middleware)
