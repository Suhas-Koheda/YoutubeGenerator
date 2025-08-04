import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def call_llm(inputString: str):
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = os.getenv("GEMINI_MODEL", "gemini-pro")

    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set")

    genai.configure(api_key=api_key)

    try:
        model = genai.GenerativeModel(model_name)
        prompt = (
            "You are a youtube manager of my youtube channel. You are responsible for creating engaging and informative video scripts based on the provided topic. "
            "Your scripts should be concise, clear, and suitable for a general audience. Use a friendly and approachable tone. "
            "You are assigned a task of creating me a creative SEO Optimised description for my youtube video. You will be creating a catchy title for my script and also a catchy description for my youtube video. "
            "The description should be SEO optimised and should include relevant keywords to help the video rank higher in search results. "
            "The description should be engaging and encourage viewers to watch the video. "
            "You will also be using Youtube metadata best optimisation practices to ensure the video is discoverable and appealing to viewers."
        )
        response = model.generate_content([prompt, inputString])
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return f"Error generating content: {str(e)}"