import React from 'react'
import { Toaster } from 'react-hot-toast'
import YouTubeContentGenerator from './components/YouTubeContentGenerator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <YouTubeContentGenerator />
    </div>
  )
}

export default App
