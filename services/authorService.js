const Author = require('../models/Author');

exports.getAllAuthors = async (filters) => {
  const { name, nationality, birthyear, page = 1, limit = 10 } = filters;

  let query = {};
  if (name) query.name = { $regex: name, $options: 'i' };
  if (nationality) query.nationality = { $regex: nationality, $options: 'i' };
  if (birthyear) query.birthYear = Number(birthyear);

  const authors = await Author.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalAuthors = await Author.countDocuments(query);

  return { authors, totalAuthors, currentPage: parseInt(page) };
};

exports.getAuthorByID = async (id) => {
  const author = await Author.findById(id);
  if (!author) throw new Error("Can't find author with this ID");
  return author;
};

exports.createAuthor = async (data) => {
  const { name, bio, nationality, birthyear } = data;

  if (!name || !bio || !nationality || !birthyear) {
    throw new Error('All fields are required');
  }

  const newAuthor = new Author({
    name,
    bio,
    nationality,
    birthYear: birthyear,
  });

  await newAuthor.save();
  return newAuthor;
};

exports.editAuthor = async (id, data) => {
  const { name, bio, nationality, birthyear } = data;

  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    { name, bio, nationality, birthYear: birthyear },
    { new: true, runValidators: true }
  );

  if (!updatedAuthor) throw new Error("Can't find author with this ID");
  return updatedAuthor;
};

exports.deleteAuthor = async (id) => {
  const deletedAuthor = await Author.findByIdAndDelete(id);
  if (!deletedAuthor) throw new Error("Can't find author with this ID");
  return deletedAuthor;
};
