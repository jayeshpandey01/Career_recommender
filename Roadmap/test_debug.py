import sys
import os

# Add src to path
sys.path.append(os.path.abspath("src"))

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

print("Starting graph...")
try:
    result = graph.invoke(initial_state, config)
    print("Success!")
    print(result.keys())
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
