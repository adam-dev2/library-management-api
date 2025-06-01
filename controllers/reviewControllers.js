const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: bookId } = req.params;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this book' });
    }

    const review = new Review({ user: userId, book: bookId, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review', error: err.message });
  }
};


exports.getBookReviews = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reviews = await Review.find({ book: bookId }).populate('user', 'fullname email');

    res.status(200).json({ message: 'Fetched book reviews', total: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};


exports.editReview = async (req, res) => {
  try {
    const { id: bookId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findOne({ _id: reviewId, book: bookId, user: userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();
    res.status(200).json({ message: 'Review updated', review });
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const { id: bookId, reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOneAndDelete({ _id: reviewId, book: bookId, user: userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};
