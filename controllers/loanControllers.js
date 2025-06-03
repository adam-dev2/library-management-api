const {
  borrowBookService,
  returnBookService,
  getAllLoansService,
  getUserLoansService,
} = require("../services/loanService");

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    const loan = await borrowBookService(userId, bookId, dueDate);

    return res.status(201).json({ message: "Book borrowed successfully", loan });
  } catch (err) {
    if (err.message === "already_borrowed") {
      return res.status(400).json({ message: "You already borrowed this book and haven’t returned it yet." });
    }
    return res.status(500).json({ message: "Error borrowing book", error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await returnBookService(id);

    return res.status(200).json({ message: "Book returned successfully", loan });
  } catch (err) {
    if (err.message === "not_found") {
      return res.status(404).json({ message: "Loan record not found" });
    }
    if (err.message === "already_returned") {
      return res.status(400).json({ message: "Book already returned" });
    }
    return res.status(500).json({ message: "Error returning book", error: err.message });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await getAllLoansService();
    return res.status(200).json({ message: "Fetched all loans", loans });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching loans", error: err.message });
  }
};

exports.getUserLoans = async (req, res) => {
  try {
    const { userId } = req.params;
    const loans = await getUserLoansService(userId);
    return res.status(200).json({ message: "Fetched user loans", loans });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user loans", error: err.message });
  }
};
