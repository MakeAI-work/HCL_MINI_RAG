from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import DeepLake
from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOpenAI
import os

# ----------------------
# Initialize application
# ----------------------
app = FastAPI(title="Scheme Recommender API") 


# Enable CORS for local development (frontend default Vite dev server runs on localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Consider tightening this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------
# Models
# ----------------------
class SchemeRequest(BaseModel):
    Objective: str
    Demographics: dict
    SpecificRequirements: dict | None = None
    AdditionalInformation: dict | None = None

# ----------------------
# Startup events – load embeddings & DB once
# ----------------------
@app.on_event("startup")
async def startup_event():
    # Expect OPENAI_API_KEY and ACTIVELOOP_TOKEN to be provided in environment (e.g., shell or .env)
    if not os.getenv("OPENAI_API_KEY") or not os.getenv("ACTIVELOOP_TOKEN"):
        raise RuntimeError("OPENAI_API_KEY and ACTIVELOOP_TOKEN must be set in environment variables.")

    embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
    dataset_path = "hub://khandelwalraghav364/EY-HACKATHON-DATABASE"
    db = DeepLake(dataset_path=dataset_path, embedding_function=embeddings, read_only=True)
    retriever = db.as_retriever()
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, top_p=0.85, frequency_penalty=0.3, presence_penalty=0.3)

    # Attach heavy objects to app.state so they're available in handlers without re-instantiation
    app.state.qa_chain = RetrievalQA.from_llm(llm, retriever=retriever)

# ----------------------
# Routes
# ----------------------
@app.get("/")
async def root():
    return {"message": "Scheme Recommender API is running"}

@app.post("/get_schemes")
async def get_schemes(payload: SchemeRequest):
    user_input = payload.dict()

    # Build prompt
    location = user_input["Demographics"].get("Location", "the user's state")
    prompt = f"""
        You are an AI assistant trained to provide detailed and actionable information about government schemes of both central and {location}.
        Using the following user input, identify up to 3 relevant government schemes in each central and {location} from the database. For each scheme, provide:
        1. Scheme Name
        2. Eligibility Criteria
        3. Benefits
        4. Application Process
        5. Any Additional Notes

        Once all the relevant schemes are listed, suggest the best scheme based on the user's location ({location}) and requirements. Justify your suggestion based on the user's needs and the scheme details. If any information is missing, indicate explicitly.

        User Input: {user_input}
    """

    qa_chain = app.state.qa_chain
    response = qa_chain.invoke(prompt)
    # Return raw response for now – frontend will handle presentation
    return response

# ----------------------
# Entry point (useful for `python -m backend.main`)
# ----------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
