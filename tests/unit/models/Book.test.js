const Book = require('../../../src/models/Book');

describe('Book model', () => {
  test('validate accepts valid data', () => {
    expect(Book.validate({ title: 'Dune', author: 'Frank Herbert', year: 1965 })).toEqual({ isValid: true });
    expect(Book.validate({ title: 'X', author: 'Y' })).toEqual({ isValid: true });
  });

  test('validate rejects missing title', () => {
    const r = Book.validate({ author: 'Someone' });
    expect(r.isValid).toBe(false);
    expect(r.error).toContain('Title');
  });

  test('validate rejects missing author', () => {
    const r = Book.validate({ title: 'Something' });
    expect(r.isValid).toBe(false);
    expect(r.error).toContain('Author');
  });

  test('toJSON returns plain object', () => {
    const book = new Book('1', 'Dune', 'Frank Herbert', 1965);
    expect(book.toJSON()).toEqual({ id: '1', title: 'Dune', author: 'Frank Herbert', year: 1965 });
  });
});
