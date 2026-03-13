/**
 * Book model – title, author, optional year, optional publisher
 */

class Book {
  constructor(id, title, author, year = null, publisher = null) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.publisher = publisher;
  }

  static validate(data) {
    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
      return { isValid: false, error: 'Title is required' };
    }
    if (!data.author || typeof data.author !== 'string' || !data.author.trim()) {
      return { isValid: false, error: 'Author is required' };
    }
    if (data.year != null && (typeof data.year !== 'number' || data.year < 0 || !Number.isInteger(data.year))) {
      return { isValid: false, error: 'Year must be a non-negative integer' };
    }
    if (data.publisher != null && (typeof data.publisher !== 'string' || !data.publisher.trim())) {
      return { isValid: false, error: 'Publisher must be a non-empty string if provided' };
    }
    return { isValid: true };
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      year: this.year,
      publisher: this.publisher
    };
  }
}

module.exports = Book;
