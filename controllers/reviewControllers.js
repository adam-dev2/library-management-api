const {
  addReviewService,
  getBookReviewsService,
  editReviewService,
  deleteReviewService,
} = require('../services/reviewService');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: bookId } = req.params;
    const userId = req.user.id;

    const review = await addReviewService(userId, bookId, rating, comment);

    return res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    if (err.message === 'invalid_rating') {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    if (err.message === 'already_reviewed') {
      return res.status(400).json({ message: 'You already reviewed this book' });
    }
    return res.status(500).json({ message: 'Error adding review', error: err.message });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reviews = await getBookReviewsService(bookId);

    return res.status(200).json({ message: 'Fetched book reviews', total: reviews.length, reviews });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

exports.editReview = async (req, res) => {
  try {
    const { id: bookId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await editReviewService(userId, bookId, reviewId, rating, comment);

    return res.status(200).json({ message: 'Review updated', review });
  } catch (err) {
    if (err.message === 'not_found') {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    return res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id: bookId, reviewId } = req.params;
    const userId = req.user.id;

    await deleteReviewService(userId, bookId, reviewId);

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    if (err.message === 'not_found') {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    return res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};
