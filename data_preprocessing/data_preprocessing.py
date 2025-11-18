import os
import re
from docx import Document
import docx2txt
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import DeepLake
from langchain.embeddings import OpenAIEmbeddings


# --------------------------------------------------
# 1️⃣ READ TXT FILE
# --------------------------------------------------
def read_txt(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


# --------------------------------------------------
# 2️⃣ READ DOC / DOCX FILE
# --------------------------------------------------
def read_doc_or_docx(path: str):
    try:
        return docx2txt.process(path)
    except:
        doc = Document(path)
        return "\n".join([p.text for p in doc.paragraphs])


# --------------------------------------------------
# 3️⃣ CLEAN TEXT
# --------------------------------------------------
def clean_text(text: str):
    if not isinstance(text, str):
        return ""
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# --------------------------------------------------
# 4️⃣ COLLECT DATA FROM ALL STATE FOLDERS
# --------------------------------------------------
def load_all_scheme_docs(root_folder: str):
    """
    Loads all .txt, .doc, .docx files from each state folder.
    Example:
        data/states/delhi/*.txt
        data/states/karnataka/*.docx
    """

    documents = []

    for state in os.listdir(root_folder):
        state_path = os.path.join(root_folder, state)

        if not os.path.isdir(state_path):
            continue

        for file in os.listdir(state_path):
            full_path = os.path.join(state_path, file)

            if file.endswith(".txt"):
                content = read_txt(full_path)

            elif file.endswith(".doc") or file.endswith(".docx"):
                content = read_doc_or_docx(full_path)

            else:
                continue

            cleaned = clean_text(content)
            documents.append(cleaned)

    return documents


# --------------------------------------------------
# 5️⃣ CHUNK DOCUMENTS
# --------------------------------------------------
def chunk_docs(documents, chunk_size=800, overlap=30):
    splitter = CharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap
    )
    chunks = []
    for doc in documents:
        for c in splitter.split_text(doc):
            chunks.append({"page_content": c})
    return chunks


# --------------------------------------------------
# 6️⃣ STORE TO DEEPLAKE
# --------------------------------------------------
def save_to_deeplake(chunks, org_id, dataset_name):
    embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")

    db = DeepLake(
        dataset_path=f"hub://{org_id}/{dataset_name}",
        embedding_function=embeddings,
    )

    print("Uploading chunks to DeepLake...")
    db.add_documents(chunks)

    print("✅ DeepLake vectorstore ready!")
    return db


# --------------------------------------------------
# 7️⃣ MAIN PIPELINE (RUN THIS)
# --------------------------------------------------
def run_full_pipeline():
    ROOT = "data/states/"   # parent folder containing 29 state folders
    ORG = "your-activeloop-org"
    DATASET = "india_schemes_rag"

    print("📥 Loading files...")
    docs = load_all_scheme_docs(ROOT)

    print(f"✔ Loaded {len(docs)} documents")

    print("✂️ Splitting...")
    chunks = chunk_docs(docs)

    print(f"✔ Generated {len(chunks)} chunks")

    print("🧠 Saving to DeepLake...")
    save_to_deeplake(chunks, ORG, DATASET)


if __name__ == "__main__":
    run_full_pipeline()
