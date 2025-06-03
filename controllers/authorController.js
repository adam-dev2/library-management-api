// controllers/authorController.js
const authorService = require('../services/authorService');

exports.getAllAuthors = async (req, res) => {
  try {
    const result = await authorService.getAllAuthors(req.query);

    if (result.authors.length === 0) {
      return res.status(404).json({ message: 'No authors found' });
    }

    return res.status(200).json({
      message: 'Fetched all authors successfully',
      ...result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error while fetching authors', error: err.message });
  }
};

exports.getAuthorByID = async (req, res) => {
  try {
    const author = await authorService.getAuthorByID(req.params.id);
    res.status(200).json({ message: 'Author found', author });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json({ message: 'Author created successfully', author: newAuthor });
  } catch (err) {
    res.status(400).json({ message: 'Error creating author', error: err.message });
  }
};

exports.editAuthor = async (req, res) => {
  try {
    const updatedAuthor = await authorService.editAuthor(req.params.id, req.body);
    res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await authorService.deleteAuthor(req.params.id);
    res.status(200).json({ message: 'Author deleted successfully', author: deletedAuthor });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
