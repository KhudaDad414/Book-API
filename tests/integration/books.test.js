const request = require('supertest');
const app = require('../../src/server');
const db = require('../../src/database/db');

beforeEach(() => {
  db.reset();
});

describe('Book API', () => {
  test('GET /api/v1/books returns list', async () => {
    const res = await request(app).get('/api/v1/books').expect(200);
    expect(res.body.books).toBeInstanceOf(Array);
    expect(res.body.books.length).toBeGreaterThanOrEqual(2);
  });

  test('GET /api/v1/books/:id returns one book', async () => {
    const res = await request(app).get('/api/v1/books/1').expect(200);
    expect(res.body.book).toMatchObject({ id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 });
  });

  test('GET /api/v1/books/:id returns 404 for missing id', async () => {
    await request(app).get('/api/v1/books/nonexistent').expect(404);
  });

  test('POST /api/v1/books creates a book', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({ title: 'Dune', author: 'Frank Herbert', year: 1965 })
      .expect(201);
    expect(res.body.book).toMatchObject({ title: 'Dune', author: 'Frank Herbert', year: 1965 });
    expect(res.body.book.id).toBeDefined();
  });

  test('POST /api/v1/books returns 400 without title', async () => {
    await request(app)
      .post('/api/v1/books')
      .send({ author: 'Someone' })
      .expect(400);
  });

  test('PUT /api/v1/books/:id updates a book', async () => {
    const res = await request(app)
      .put('/api/v1/books/1')
      .send({ title: 'The Great Gatsby (Updated)', year: 1925 })
      .expect(200);
    expect(res.body.book.title).toBe('The Great Gatsby (Updated)');
  });

  test('DELETE /api/v1/books/:id removes book', async () => {
    await request(app).delete('/api/v1/books/1').expect(200);
    await request(app).get('/api/v1/books/1').expect(404);
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health').expect(200);
    expect(res.body.status).toBe('ok');
  });
});
