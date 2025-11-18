
# Team- Cosmic

A **multimodal AI application** where users fill a simple form and instantly receive **personalized central and state government scheme recommendations**.  
Built using a **React** front-end, **FastAPI** back-end, and a **DeepLake vector database** powered by curated **Kaggle datasets**.

## 🛠️ Tech Stack

- **Frontend:** React (Create React App)
- **Backend:** Python 3.11 + FastAPI
- **Vector Store:** DeepLake
- **Primary Dataset:** Kaggle
- **LLM Model:** OpenAI GPT-4

---

## 📁 Current Repository Structure

```
/                                # project root
├─ backend/                      # FastAPI server
│  ├─ main.py                    # application entry
│  ├─ requirements.txt           # Python deps
│  └─ .env                       # backend secrets (git-ignored)
│
├─ frontend/                     # Vite + React SPA
│  ├─ index.html                 # HTML template (Tailwind CDN)
│  ├─ package.json               # JS deps & scripts
│  ├─ vite.config.js             # Vite config + proxy
│  └─ src/
│      ├─ main.jsx               # React entry
│      ├─ App.jsx                # root component
│      └─ components/
│          ├─ SchemeForm.jsx     # form to collect user data
│          └─ SchemeResults.jsx  # displays recommendations
│
├─ .env                          # global env vars (git-ignored)
└─ README.md                     # documentation (this file)

---

## 🏗️ High-Level Architecture

```text
┌────────────┐       HTTPS       ┌───────────────┐          REST        ┌─────────────┐
│    UI      │  ◀──────────────▶ │   FastAPI     │  ───────────────▶     │  DeepLake   │
│  (React)   │                   │  Backend API  │                       │ Vector DB   │
└────────────┘                   └───────────────┘                       └─────────────┘
         
```

## 🧠 RAG Architecture

![RAG Architecture](https://github.com/user-attachments/assets/3d6ca6df-cd39-422a-ac35-44c981d6dbac)

---

## 🚀 Local Setup

### 1. Prerequisites

```bash
# Node ≥ 18
# Python ≥ 3.10
```

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Copy or create .env with the following vars
# OPENAI_API_KEY=<your-openai-key>
# ACTIVELOOP_TOKEN=<your-activeloop-token>

python -m backend.main        # http://localhost:8000
```

### 3. Frontend

```bash
cd frontend
npm install     # or yarn / pnpm
npm run dev     # http://localhost:5173
```

### 4. (Optional) Regenerate Embeddings

If you need to rebuild the DeepLake vector store:

```bash
python scripts/embed_data.py   # expects data in ./data/raw
```

### 4. Dataset & Embeddings

1. Download the dataset from Kaggle: https://www.kaggle.com/datasets/nitishabharathi/indian-government-schemes
2. Run `python scripts/embed_data.py` to generate embeddings and push to DeepLake.

---

## 🏄‍♀️ Deployment

- **Frontend:** Netlify / Vercel static deploy.
- **Backend:** Render / Fly.io Docker container.
- **Environment:** Ensure `OPENAI_API_KEY` , `ACTIVELOOP_TOKEN` and dataset paths are configured.





