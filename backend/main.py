from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Demo backend for Q&A Bot")

# Very permissive CORS for local development — tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = None


class Law(BaseModel):
    id: int
    title: str
    text: str


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5


# In-memory demo data
DOCUMENTS = [
    {"id": 1, "title": "Закон о труде", "text": "Текст закона о труде..."},
    {"id": 2, "title": "Инструкция по безопасности", "text": "Текст инструкции..."},
    {"id": 3, "title": "Закон о защите данных", "text": "Текст закона о данных..."},
]


@app.post('/api/auth/login')
async def login(payload: LoginRequest):
    # demo: accept any credentials and return a token
    if not payload.email:
        raise HTTPException(status_code=400, detail="Email required")
    token = f"demo-token-for-{payload.email}"
    return {"token": token}


@app.post('/api/auth/register')
async def register(payload: RegisterRequest):
    # demo: simply echo back
    return {"id": 123, "email": payload.email, "name": payload.name}


@app.get('/api/laws', response_model=List[Law])
async def list_laws():
    return DOCUMENTS


@app.get('/api/laws/{law_id}', response_model=Law)
async def get_law(law_id: int):
    for d in DOCUMENTS:
        if d['id'] == law_id:
            return d
    raise HTTPException(status_code=404, detail='Not found')


@app.post('/api/search')
async def search(req: SearchRequest):
    # Simple demo: score by substring match (stub for vector search)
    q = req.query.lower()
    hits = []
    for d in DOCUMENTS:
        score = 1.0 if q in d['title'].lower() or q in d['text'].lower() else 0.0
        hits.append({"id": d['id'], "title": d['title'], "text": d['text'], "score": score})
    hits = sorted(hits, key=lambda x: x['score'], reverse=True)[: req.top_k]
    return {"results": hits}
