/**
 * In-memory store for books (demo only)
 */

const { v4: uuidv4 } = require('uuid');
const Book = require('../models/Book');

class Database {
  constructor() {
    this.books = new Map();
    this._seed();
  }

  _seed() {
    const sample = [
      new Book('1', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925),
      new Book('2', '1984', 'George Orwell', 1949)
    ];
    sample.forEach(b => this.books.set(b.id, b));
  }

  getBooks() {
    return Array.from(this.books.values());
  }

  getBookById(id) {
    return this.books.get(id) || null;
  }

  createBook(data) {
    const id = uuidv4().slice(0, 8);
    const book = new Book(id, data.title.trim(), data.author.trim(), data.year ?? null);
    this.books.set(id, book);
    return book;
  }

  updateBook(id, data) {
    const book = this.books.get(id);
    if (!book) return null;
    if (data.title !== undefined) book.title = data.title.trim();
    if (data.author !== undefined) book.author = data.author.trim();
    if (data.year !== undefined) book.year = data.year;
    return book;
  }

  deleteBook(id) {
    return this.books.delete(id);
  }

  /** Reset store and re-seed (for tests) */
  reset() {
    this.books.clear();
    this._seed();
  }
}

module.exports = new Database();
