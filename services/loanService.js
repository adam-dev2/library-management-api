const Loan = require("../models/Loan");

exports.borrowBookService = async (userId, bookId, dueDate) => {
  const existingLoan = await Loan.findOne({ user: userId, book: bookId, isReturned: false });
  if (existingLoan) throw new Error("already_borrowed");

  const loan = new Loan({ user: userId, book: bookId, dueDate });
  await loan.save();
  return loan;
};

exports.returnBookService = async (loanId) => {
  const loan = await Loan.findById(loanId).populate("book");
  if (!loan) throw new Error("not_found");
  if (loan.isReturned) throw new Error("already_returned");

  loan.isReturned = true;
  loan.returnDate = new Date();
  loan.status = "returned";

  if (loan.returnDate > loan.dueDate) {
    const daysLate = Math.ceil((loan.returnDate - loan.dueDate) / (1000 * 60 * 60 * 24));
    loan.fineAmount = daysLate * 10;
  }

  await loan.save();
  return loan;
};

exports.getAllLoansService = async () => {
  return await Loan.find()
    .populate("user", "fullname email")
    .populate("book", "title author");
};

exports.getUserLoansService = async (userId) => {
  return await Loan.find({ user: userId }).populate("book", "title category");
};
