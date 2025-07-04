import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def call_llm(inputString: str):
    token = os.getenv("GITHUB_API_TOKEN")
    endpoint = os.getenv("GITHUB_API_ENDPOINT")
    model = os.getenv("OPENAI_MODEL")
    
    # Validate environment variables
    if not token:
        raise ValueError("GITHUB_API_TOKEN environment variable is not set")
    if not endpoint:
        raise ValueError("GITHUB_API_ENDPOINT environment variable is not set")
    if not model:
        raise ValueError("OPENAI_MODEL environment variable is not set")

    try:
        # Initialize OpenAI client with GitHub Models endpoint
        client = OpenAI(
            api_key=token,
            base_url=endpoint,
        )
    except Exception as e:
        print(f"Error initializing OpenAI client: {e}")
        raise

    try:
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a youtube manager of my youtube channel. You are responsible for creating engaging and informative video scripts based on the provided topic. Your scripts should be concise, clear, and suitable for a general audience. Use a friendly and approachable tone."
                               "You are assigned a task of creating me a creative SEO Optimised description for my youtube video. You wll be creating a catchy title for my script and also a catchy description for my youtube video. The description should be SEO optimised and should include relevant keywords "
                               "to help the video rank higher in search results. The description should be engaging and encourage viewers to watch the video."
                               "You will also be using Youtube metadata best optimisation practices to ensure the video is discoverable and appealing to viewers.",
                },
                {
                    "role": "user",
                    "content": inputString
                }
            ],
            temperature=0,
            top_p=1.0,
            model=model
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return f"Error generating content: {str(e)}"