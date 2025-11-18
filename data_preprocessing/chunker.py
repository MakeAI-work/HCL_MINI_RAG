from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunk_documents(documents: list[str], chunk_size=500, overlap=50):
    """
    Split scheme documents into smaller chunks for vector storage.
    
    Args:
        documents (list[str]): List of long scheme documents.
        chunk_size (int): Max characters per chunk.
        overlap (int): Overlap between chunks.
    
    Returns:
        list[str]: List of chunked text documents.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n\n", "\n", ".", " "]
    )

    chunks = []
    for doc in documents:
        pieces = splitter.split_text(doc)
        chunks.extend(pieces)

    return chunks
