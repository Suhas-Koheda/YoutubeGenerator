import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from llm.LLM import call_llm

# Load environment variables
load_dotenv()

app = FastAPI(
    title="YouTube Content Manager API",
    description="AI-powered YouTube content creation assistant",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "YouTube Content Manager API is running!"}

@app.get("/userInput/")
def read_root(userInput: str = "No user input has been seen here"):
    return {"response": call_llm(userInput)}