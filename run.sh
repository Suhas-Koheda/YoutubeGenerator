#!/bin/bash

# YouTube Content Manager - Run Script
# This script starts both the backend (FastAPI) and frontend (React) servers

set -e  # Exit on any error

echo "🎬 YouTube Content Manager - Starting Application"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your actual API token before running again."
        exit 1
    else
        print_error ".env.example not found. Please create a .env file manually."
        exit 1
    fi
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
print_status "Activating Python virtual environment..."
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install -r requirements.txt

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Function to cleanup processes on exit
cleanup() {
    print_status "Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    exit 0
}

# Set up trap to cleanup on exit
trap cleanup EXIT INT TERM

# Start backend server
print_status "Starting FastAPI backend server on http://localhost:8000..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if ! curl -s http://localhost:8000/ > /dev/null; then
    print_error "Backend server failed to start!"
    exit 1
fi

print_status "Backend server started successfully!"

# Start frontend server
print_status "Starting React frontend server on http://localhost:3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 5

print_status "Frontend server started successfully!"

echo ""
echo "🚀 Application is now running!"
echo "================================"
echo -e "Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "Backend:  ${BLUE}http://localhost:8000${NC}"
echo -e "API Docs: ${BLUE}http://localhost:8000/docs${NC}"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Keep the script running and wait for user input
wait
