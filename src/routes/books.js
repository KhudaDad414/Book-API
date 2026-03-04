/**
 * Book CRUD routes – no auth
 */

const express = require('express');
const router = express.Router();
const db = require('../database/db');
const Book = require('../models/Book');

// List books
router.get('/', (req, res) => {
  const books = db.getBooks();
  res.json({ books: books.map(b => b.toJSON()) });
});

// Get one book
router.get('/:id', (req, res) => {
  const book = db.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: { name: 'notFound', message: 'Book not found' } });
  }
  res.json({ book: book.toJSON() });
});

// Create book
router.post('/', (req, res) => {
  const validation = Book.validate(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: { name: 'validationError', message: validation.error } });
  }
  const book = db.createBook(req.body);
  res.status(201).json({ book: book.toJSON() });
});

// Update book
router.put('/:id', (req, res) => {
  const book = db.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: { name: 'notFound', message: 'Book not found' } });
  }
  const updates = req.body;
  const merged = { title: updates.title ?? book.title, author: updates.author ?? book.author, year: updates.year !== undefined ? updates.year : book.year };
  const validation = Book.validate(merged);
  if (!validation.isValid) {
    return res.status(400).json({ error: { name: 'validationError', message: validation.error } });
  }
  const updated = db.updateBook(req.params.id, updates);
  res.json({ book: updated.toJSON() });
});

// Delete book
router.delete('/:id', (req, res) => {
  const ok = db.deleteBook(req.params.id);
  if (!ok) {
    return res.status(404).json({ error: { name: 'notFound', message: 'Book not found' } });
  }
  res.status(200).json({ message: 'Book deleted', id: req.params.id });
});

module.exports = router;
