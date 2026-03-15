import sys
import os
import time

# Add src to path
sys.path.append(os.path.abspath("src"))

print("Importing graph...", flush=True)
from ollama_deep_researcher.graph import graph
from ollama_deep_researcher.state import SummaryStateInput
from langchain_core.runnables import RunnableConfig

initial_state = SummaryStateInput(research_topic="Test AI Roadmap")
config = RunnableConfig(
    configurable={
        "search_api": "duckduckgo",
        "max_web_research_loops": 0,
        "generate_roadmap": True,
        "generate_mermaid_diagram": True,
        "llm_provider": "ollama",
        "local_llm": "llama3.2:1b"
    }
)

print("Starting graph invocation...", flush=True)
try:
    # Run with a short timeout or just trace
    from langchain_core.tracers.stdout import ConsoleCallbackHandler
    result = graph.invoke(initial_state, config, {"callbacks": [ConsoleCallbackHandler()]})
    print("Success!", flush=True)
    print(result.keys(), flush=True)
except Exception as e:
    print(f"Error caught in script: {e}", flush=True)
    import traceback
    traceback.print_exc()
