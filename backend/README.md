# Demo backend for the project

Простой FastAPI backend для учебного примера с endpoint-ами для аутентификации, получения документов и поиска.

Установка и запуск (рекомендуется в virtualenv):

```bash
python -m venv .venv
source .venv/bin/activate    # Linux/Mac
.venv\Scripts\activate     # Windows PowerShell
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Примеры запросов (curl):

```bash
# login
curl -X POST "http://localhost:8000/api/auth/login" -H "Content-Type: application/json" -d '{"email":"test","password":"123"}'

# list laws
curl "http://localhost:8000/api/laws"

# get law
curl "http://localhost:8000/api/laws/1"

# search
curl -X POST "http://localhost:8000/api/search" -H "Content-Type: application/json" -d '{"query":"труд","top_k":5}'
```

Пример fetch из фронтенда:

```js
const res = await fetch('http://localhost:8000/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'рабочие права', top_k: 5 })
});
const data = await res.json();
console.log(data.results);
```

Примечание: для локальной разработки CORS разрешён максимально ("*"). В продакшне укажите конкретные origin'ы и настройте безопасность (JWT, HTTPS и т.д.).
