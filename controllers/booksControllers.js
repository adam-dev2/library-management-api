const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const { title, author, category, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };

    console.log("QUERY:", req.query);
console.log("FILTER:", filter)

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalBooks = await Book.countDocuments(filter);

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }

    return res.status(200).json({
      message: 'Fetched all books successfully',
      total: totalBooks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBooks / limit),
      books,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error while fetching all books', error: err.message });
  }
};


exports.getByID = async(req,res) => {
    try {
        const {id} = req.params;
        const fetchBoook = await Book.findById(id);
        if(!fetchBoook){
            return res.status(404).json({message: 'No books found with this ID'});
        }
        return res.status(200).json({message: 'successfully fetched bookd with this ID',book:fetchBoook});  
    }catch(err){
        return res.status(500).json({message: `Error while fetching book by id`,error: err.message})
    }
}

exports.createBook = async(req,res) => {
    try{
        const {title,author,category,publishedYear} = req.body;
        if(!title || !author || !category || !publishedYear ) {
            return res.status(400).json({message: `Missing fields`});
        }

        const existingBook = await Book.findOne({ title, author });

        if (existingBook) {
        return res.status(409).json({
            message: 'Book already exists by this author'
        });
        }

        const newBook = new Book({title,author,category,publishedYear});
        await newBook.save();

        return res.status(201).json({message:'New book created successfully',book: newBook});
    }catch(err){
        return res.status(500).json({message: "Error while creating book",error: err.message})
    }
}

exports.editBook = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,author,category,publishedYear} = req.body;
        const updateBook = await Book.findByIdAndUpdate(
            id,
            {title,author,category,publishedYear},
            {new:true,runValidators: true}
        ) 
        if(!updateBook) {
            return res.status(404).json({message:'Book not found with this ID'});
        }

        return res.status(200).json({message:'Edited Book successfully',book:updateBook});
    }catch(err){
        return res.status(500).json({message: 'Error whie editing book',error: err.message})
    }
}

exports.deleteBook = async(req,res) => {
    try{
        const {id} = req.params;
        const deletebook = await Book.findByIdAndDelete(id);
        if (!deletebook) {
            return res.status(404).json({ message: 'No book found with this ID' });
        }

        return res.status(200).json({
        message: 'Book deleted successfully',
        book: deletebook
        });
    }catch(err){
        return res.status(500).json({message:'Error while deleting Book',error: err.message});
    }
}