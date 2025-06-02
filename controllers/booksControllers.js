const bookService = require('../services/bookService');

exports.getAllBooks = async (req, res) => {
  try {
    const { title, author, category, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (author) filters.author = { $regex: author, $options: 'i' };
    if (category) filters.category = { $regex: category, $options: 'i' };

    const { books, totalBooks } = await bookService.getAllBooksService(filters, page, limit);

    if (books.length === 0)
      return res.status(404).json({ message: 'No books found' });

    return res.status(200).json({
      message: 'Fetched all books successfully',
      total: totalBooks,
      currentPage: parseInt(page),
      books,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

exports.getByID = async (req, res) => {
  try {
    const book = await bookService.getBookByIdService(req.params.id);
    if (!book)
      return res.status(404).json({ message: 'No books found with this ID' });

    return res.status(200).json({ message: 'Book fetched successfully', book });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching book by ID', error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, category, publishedYear } = req.body;
    if (!title || !author || !category || !publishedYear)
      return res.status(400).json({ message: 'Missing fields' });

    try {
      const newBook = await bookService.createBookService({ title, author, category, publishedYear });
      return res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      if (error.message === 'exists') {
        return res.status(409).json({ message: 'Book already exists by this author' });
      }
      throw error;
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

exports.editBook = async (req, res) => {
  try {
    const updated = await bookService.editBookService(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: 'Book not found with this ID' });

    return res.status(200).json({ message: 'Book updated successfully', book: updated });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating book', error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await bookService.deleteBookService(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Book not found with this ID' });

    return res.status(200).json({ message: 'Book deleted successfully', book: deleted });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};

exports.uploadBookCover = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded' });

    const updatedBook = await bookService.uploadBookCoverService(req.params.id, req.file.filename);
    if (!updatedBook)
      return res.status(404).json({ message: 'Book not found with this ID' });

    return res.status(200).json({
      message: 'Cover uploaded successfully',
      coverImage: `/uploads/${req.file.filename}`,
      book: updatedBook
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error uploading cover', error: err.message });
  }
};
