@echo off
echo Starting YouTube Content Manager...
echo ================================

REM Start backend server
echo Starting backend server...
start "Backend Server" cmd /k "python main.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend server
echo Starting frontend server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo.
echo 🚀 Application is now running!
echo ================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all servers...
pause > nul

REM Kill all node and python processes (optional cleanup)
taskkill /f /im node.exe 2>nul
taskkill /f /im python.exe 2>nul
echo All servers stopped.
