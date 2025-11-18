# Problem Statement

A **multimodal AI application** where users fill a simple form and instantly receive **personalized central and state government scheme recommendations**.  
Built using a **React** front-end, **FastAPI** back-end, and a **DeepLake vector database** powered by curated **Kaggle datasets**.

## 🛠️ Tech Stack

- **Frontend:** React (Create React App)
- **Backend:** Python 3.11 + FastAPI
- **Vector Store:** DeepLake
- **Primary Dataset:** Kaggle
- **LLM Model:** OpenAI GPT-4

---

## 📁 Repository Structure (recommended)

```
/                               # root of the repo
├─ frontend/                    # React SPA
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  └─ main.tsx
│  ├─ public/
│  └─ package.json
│
├─ backend/                     # FastAPI server
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ v1/
│  │  │  │  └─ endpoints.py
│  │  ├─ core/                  # settings, logging, security
│  │  ├─ services/              # business logic – vector search, etc.
│  │  ├─ models.py
│  │  └─ main.py
│  └─ pyproject.toml
│
├─ data/                        # Raw & processed datasets (git-ignored)
│  ├─ raw/                      # downloaded from Kaggle
│  └─ processed/                # cleaned / embedded vectors
│
├─ docs/                        # architecture diagrams, ADRs
│
├─ scripts/                     # helper shell / python scripts
│
├─ .env.example                 # environment variables template
└─ README.md                    # you are here

---

## 🏗️ High-Level Architecture

```text
┌────────────┐       HTTPS       ┌───────────────┐          REST        ┌─────────────┐
│    UI      │  ◀──────────────▶ │   FastAPI     │  ───────────────▶     │  DeepLake   │
│  (React)   │                   │  Backend API  │                       │ Vector DB   │
└────────────┘                   └───────────────┘                       └─────────────┘
         
```

1. **React** renders the SPA and communicates with FastAPI via JSON/REST or WebSockets.
2. **FastAPI** exposes endpoints, performs data processing, and queries DeepLake for similarity search.
3. **DeepLake** stores vector embeddings derived from Kaggle dataset rows / documents.

---

## 🚀 Local Setup

### 1. Clone & prerequisites

```bash
# Node ≥ 18, Python ≥ 3.11, Poetry & pnpm recommended.
```

### 2. Frontend

```bash
cd frontend
pnpm install   # or yarn / npm
pnpm dev       # starts Vite dev server on http://localhost:5173
```

### 3. Backend

```bash
cd backend
poetry install          # installs Python deps
cp .env.example .env    # add your environment variables
uvicorn app.main:app --reload --port 8000
```

### 4. Dataset & Embeddings

1. Download the dataset from Kaggle into `data/raw/`.
2. Run `python scripts/embed_data.py` to generate embeddings and push to DeepLake.

---

## 🏄‍♀️ Deployment

- **Frontend:** Netlify / Vercel static deploy.
- **Backend:** Render / Fly.io Docker container.
- **Environment:** Ensure `DEEP_LAKE_TOKEN` and dataset paths are configured.

---

## 🤝 Contributing

1. Fork & clone.
2. Create a feature branch.
3. Follow the commit message convention `<type>(scope): subject`.
4. Submit PR.

---

## 📜 License

MIT © 2025 EY Project Team

