# 🎬 YouTube Content Manager

An AI-powered YouTube content creation assistant that helps you generate engaging, SEO-optimized video titles and descriptions using GitHub's AI models.

## 🚀 Features

- **AI-Powered Content Generation**: Uses OpenAI GPT-4.1 through GitHub's AI inference API
- **SEO Optimization**: Generates content optimized for YouTube search rankings
- **Modern Web Interface**: Beautiful, responsive React frontend
- **RESTful API**: FastAPI backend with automatic documentation
- **Easy Setup**: Simple environment configuration and one-command startup

## 📋 Project Structure

```
ytb/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── llm/
│   │   └── LLM.py          # AI model integration
│   ├── requirements.txt     # Python dependencies
│   ├── .env                # Environment variables (not in git)
│   └── .env.example        # Environment template
├── frontend/
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies
│   └── ...
├── run.sh                  # Startup script
└── README.md              # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- GitHub account with API access

### 1. Clone and Setup Environment

#### For Linux/macOS:
```bash
# Clone the repository
git clone https://github.com/Suhas-Koheda/YoutubeGenerator
cd YoutubeGenerator

# Copy environment template
cp .env.example .env
```

#### For Windows:
```cmd
# Clone the repository
git clone https://github.com/Suhas-Koheda/YoutubeGenerator
cd YoutubeGenerator

# Copy environment template
copy .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` file with your credentials:

```env
# GitHub API Configuration
GITHUB_API_TOKEN=your_github_api_token_here
GITHUB_API_ENDPOINT=https://models.github.ai/inference
OPENAI_MODEL=openai/gpt-4.1

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

### 3. Install Dependencies

#### Backend Dependencies

**For Linux/macOS:**
```bash
pip install -r requirements.txt
```

**For Windows:**
```cmd
pip install -r requirements.txt
```

#### Frontend Dependencies

**For Linux/macOS:**
```bash
cd frontend
npm install
cd ..
```

**For Windows:**
```cmd
cd frontend
npm install
cd ..
```

### 4. Run the Application

#### Quick Start (Both Frontend & Backend)

**For Linux/macOS:**
```bash
chmod +x run.sh
./run.sh
```

**For Windows:**
Create a `run.bat` file with the following content:
```batch
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
```

Then run:
```cmd
run.bat
```

#### Manual Start

**Backend (Linux/macOS):**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Backend (Windows):**
```cmd
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend (Linux/macOS):**
```bash
cd frontend
npm start
```

**Frontend (Windows):**
```cmd
cd frontend
npm start
```

## 🌐 API Endpoints

### Base URL: `http://localhost:8000`

#### GET `/`
- **Description**: Health check endpoint
- **Response**: `{"message": "YouTube Content Manager API is running!"}`

#### GET `/userInput/`
- **Description**: Generate YouTube content based on user input
- **Parameters**: 
  - `userInput` (string): The topic or description for your video
- **Response**: 
  ```json
  {
    "response": "Generated SEO-optimized title and description"
  }
  ```

### Example Usage

```bash
curl "http://localhost:8000/userInput/?userInput=How to learn Python programming for beginners"
```

## 🎨 Frontend Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Processing**: Live feedback during content generation
- **Copy to Clipboard**: Easy copying of generated content
- **Dark/Light Mode**: Toggle between themes
- **Mobile Responsive**: Works perfectly on all devices

## 🔧 Development

### Backend Development

The backend is built with FastAPI and includes:
- Automatic API documentation at `http://localhost:8000/docs`
- Interactive API explorer at `http://localhost:8000/redoc`
- Hot reload during development

### Frontend Development

The frontend is built with React and Vite:
- Fast development server with hot reload
- Modern build tooling
- Component-based architecture

### Adding New Features

1. **Backend**: Add new endpoints in `main.py`
2. **AI Logic**: Extend functionality in `llm/LLM.py`
3. **Frontend**: Add components in `frontend/src/components/`

## 🔒 Security

- Environment variables are used for sensitive data
- CORS is configured for frontend-backend communication
- API tokens are never exposed in frontend code

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GITHUB_API_TOKEN` | Your GitHub API token | Yes | - |
| `GITHUB_API_ENDPOINT` | GitHub AI inference endpoint | No | `https://models.github.ai/inference` |
| `OPENAI_MODEL` | AI model to use | No | `openai/gpt-4.1` |
| `HOST` | Server host | No | `0.0.0.0` |
| `PORT` | Server port | No | `8000` |
| `DEBUG` | Enable debug mode | No | `True` |

## 🚨 Troubleshooting

### Common Issues

1. **API Token Error**: Ensure your GitHub API token is valid and has necessary permissions
2. **Port Already in Use**: Change the PORT in `.env` or kill the process using the port
3. **CORS Errors**: Ensure frontend URL is added to CORS origins in `main.py`
4. **PostCSS Config Error**: If you see "module is not defined in ES module scope", ensure `postcss.config.js` uses ES6 export syntax:
   ```javascript
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

### Platform-Specific Issues

#### Windows
- Use `run.bat` instead of `run.sh`
- Use `copy` instead of `cp` for file operations
- Use `cmd` instead of `bash` for terminal commands

#### Linux/macOS
- Make sure `run.sh` is executable: `chmod +x run.sh`
- Use forward slashes for file paths

### Getting Help

- Check the API documentation at `http://localhost:8000/docs`
- Review logs in the terminal where you started the servers
- Ensure all dependencies are installed correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Thumbnail generation suggestions
- [ ] Video tag recommendations
- [ ] Content calendar integration
- [ ] Multiple AI model support
- [ ] Batch content generation
- [ ] Analytics integration

---

**Made with ❤️ for YouTubers by YouTubers**
