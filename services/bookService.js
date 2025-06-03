const Book = require('../models/Book');

exports.getAllBooksService = async (filters, page, limit) => {
  const books = await Book.find(filters)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalBooks = await Book.countDocuments(filters);

  return { books, totalBooks };
};

exports.getBookByIdService = async (id) => {
  return await Book.findById(id);
};

exports.createBookService = async (data) => {
  const { title, author } = data;
  const existing = await Book.findOne({ title, author });
  if (existing) throw new Error('exists');

  const newBook = new Book(data);
  await newBook.save();
  return newBook;
};

exports.editBookService = async (id, data) => {
  return await Book.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.deleteBookService = async (id) => {
  return await Book.findByIdAndDelete(id);
};

exports.uploadBookCoverService = async (id, filename) => {
  const book = await Book.findById(id);
  if (!book) return null;

  book.coverImage = filename;
  await book.save();
  return book;
};
    