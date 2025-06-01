const Loan = require('../models/Loan');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    const existingLoan = await Loan.findOne({ user: userId, book: bookId, isReturned: false });
    if (existingLoan) {
      return res.status(400).json({ message: `You already borrowed this book and haven’t returned it yet.` });
    }

    const loan = new Loan({
      user: userId,
      book: bookId,
      dueDate
    });

    await loan.save();
    return res.status(201).json({ message: 'Book borrowed successfully', loan });
  } catch (err) {
    return res.status(500).json({ message: 'Error borrowing book', error: err.message });
  }
};


exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findById(id).populate('book');
    if (!loan) return res.status(404).json({ message: 'Loan record not found' });

    if (loan.isReturned) return res.status(400).json({ message: 'Book already returned' });

    loan.isReturned = true;
    loan.returnDate = new Date();
    loan.status = 'returned';

    
    if (loan.returnDate > loan.dueDate) {
      const daysLate = Math.ceil((loan.returnDate - loan.dueDate) / (1000 * 60 * 60 * 24));
      loan.fineAmount = daysLate * 10; 
    }

    await loan.save();
    return res.status(200).json({ message: 'Book returned successfully', loan });
  } catch (err) {
    return res.status(500).json({ message: 'Error returning book', error: err.message });
  }
};


exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('user', 'fullname email').populate('book', 'title author');
    return res.status(200).json({ message: 'Fetched all loans', loans });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching loans', error: err.message });
  }
};


exports.getUserLoans = async (req, res) => {
  try {
    const { userId } = req.params;
    const loans = await Loan.find({ user: userId }).populate('book', 'title category');

    return res.status(200).json({ message: 'Fetched user loans', loans });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching user loans', error: err.message });
  }
};
