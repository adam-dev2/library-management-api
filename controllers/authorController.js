const Author = require('../models/Author');

exports.getAllAuthors = async (req, res) => {
  try {
    const { name, nationality, birthyear, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (nationality) filter.nationality = { $regex: nationality, $options: 'i' };
    if (birthyear) filter.birthYear = Number(birthyear);

    const authors = await Author.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalAuthors = await Author.countDocuments(filter);

    if (authors.length === 0) {
      return res.status(404).json({ message: 'No authors found' });
    }

    return res.status(200).json({
      message: 'Fetched all authors successfully',
      totalAuthors,
      currentPage: parseInt(page),
      authors
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error while fetching authors', error: err.message });
  }
};

exports.getAuthorByID = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ message: "Can't find author with this ID" });
    }

    return res.status(200).json({ message: 'Author found', author });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching author by ID', error: err.message });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const { name, bio, nationality, birthyear } = req.body;

    if (!name || !bio || !nationality || !birthyear) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAuthor = new Author({
      name,
      bio,
      nationality,
      birthYear: birthyear
    });

    await newAuthor.save();

    return res.status(201).json({ message: 'Author created successfully', author: newAuthor });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating author', error: err.message });
  }
};

exports.editAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, nationality, birthyear } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, bio, nationality, birthYear: birthyear },
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Can't find author with this ID" });
    }

    return res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating author', error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({ message: "Can't find author with this ID" });
    }

    return res.status(200).json({ message: 'Author deleted successfully', author: deletedAuthor });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting author', error: err.message });
  }
};
