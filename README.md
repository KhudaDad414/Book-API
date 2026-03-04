# Book API

Simple REST API for books – CRUD only, no auth. Good for demos and learning.

## Quick start

```bash
npm install && npm run dev
```

Base URL: **http://localhost:3000**

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1/books` | List all books |
| GET | `/api/v1/books/:id` | Get one book |
| POST | `/api/v1/books` | Create a book |
| PUT | `/api/v1/books/:id` | Update a book |
| DELETE | `/api/v1/books/:id` | Delete a book |

No authentication required.

## Examples

**List books**
```bash
curl http://localhost:3000/api/v1/books
```

**Create book**
```bash
curl -X POST http://localhost:3000/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","year":1965}'
```

**Update book** (PUT with full or partial fields)
```bash
curl -X PUT http://localhost:3000/api/v1/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","year":1965}'
```

**Delete book**
```bash
curl -X DELETE http://localhost:3000/api/v1/books/1
```

## Book shape

- **title** (string, required)
- **author** (string, required)
- **year** (number, optional)

Responses use `{ book: {...} }` or `{ books: [...] }`. Errors use `{ error: { name, message } }`.

## Commands

- `npm run dev` – dev server with reload
- `npm start` – production
- `npm test` – run tests
- `npm run lint` – lint

## Project layout

```
src/
├── server.js
├── database/db.js    # In-memory store
├── models/Book.js
├── routes/books.js
└── middleware/errorHandler.js
```

## Config

Optional `.env`: `PORT=3000`

License: ISC
