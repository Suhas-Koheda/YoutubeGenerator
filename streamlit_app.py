import streamlit as st
import sys
import importlib.util

# Dynamically import llm/LLM.py
spec = importlib.util.spec_from_file_location("LLM", "llm/LLM.py")
LLM = importlib.util.module_from_spec(spec)
sys.modules["LLM"] = LLM
spec.loader.exec_module(LLM)

st.set_page_config(page_title="YouTube Content Generator", page_icon="📺", layout="centered")
st.title("YouTube Content Generator")
st.write("Generate creative, SEO-optimized YouTube titles and descriptions!")

user_input = st.text_area("Enter your video topic:", "")

if st.button("Generate Content"):
    if user_input.strip():
        with st.spinner("Generating..."):
            try:
                result = LLM.call_llm(user_input)
                st.success("Generated Content:")
                st.write(result)
            except Exception as e:
                st.error(f"LLM call failed: {e}")
    else:
        st.warning("Please enter a topic to generate content.")
