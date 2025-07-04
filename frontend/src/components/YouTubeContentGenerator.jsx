import React, { useState } from 'react'
import { 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  Youtube, 
  Zap,
  TrendingUp,
  Target
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const YouTubeContentGenerator = () => {
  const [userInput, setUserInput] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const API_BASE_URL = 'http://localhost:8000'

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      toast.error('Please enter a video topic or description!')
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/userInput/`, {
        params: { userInput: userInput.trim() }
      })
      
      setGeneratedContent(response.data.response)
      toast.success('Content generated successfully!')
    } catch (error) {
      console.error('Error generating content:', error)
      toast.error('Failed to generate content. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedContent) return
    
    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      toast.success('Content copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy content')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate()
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Youtube className="w-16 h-16 text-red-600" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse-slow" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            YouTube Content
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              {' '}Manager
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create engaging, SEO-optimized YouTube titles and descriptions with the power of AI. 
            Transform your video ideas into viral content.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600">Advanced AI creates compelling content tailored to your topic</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO Optimized</h3>
            <p className="text-gray-600">Content optimized for YouTube search rankings and discovery</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Audience Focused</h3>
            <p className="text-gray-600">Engaging content designed to captivate your viewers</p>
          </div>
        </div>

        {/* Main Content Generator */}
        <div className="bg-white rounded-2xl card-shadow overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <Play className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Generate Your Content</h2>
            </div>
            
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="videoTopic" className="block text-sm font-medium text-gray-700 mb-3">
                Video Topic or Description
              </label>
              <div className="relative">
                <textarea
                  id="videoTopic"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your video topic, idea, or description here... (e.g., 'How to learn Python programming for beginners', 'Best travel destinations in 2024', etc.)"
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl input-focus resize-none placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  Ctrl/Cmd + Enter to generate
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !userInput.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Amazing Content...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Content Section */}
            {generatedContent && (
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                    Generated Content
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Pro Tips</h4>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Be specific about your video topic for better AI-generated content
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Include your target audience (e.g., "for beginners", "for professionals")
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Mention the video format if relevant (tutorial, review, comparison, etc.)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use Ctrl/Cmd + Enter as a quick shortcut to generate content
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Made with ❤️ for YouTubers by YouTubers</p>
        </div>
      </div>
    </div>
  )
}

export default YouTubeContentGenerator
