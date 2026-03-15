from app import app
import uvicorn
import traceback

if __name__ == "__main__":
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, log_level="debug")
    except Exception:
        traceback.print_exc()
