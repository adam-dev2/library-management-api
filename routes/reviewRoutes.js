const express = require('express');
const router = express.Router();
const {addReview,getBookReviews,editReview,deleteReview} = require('../controllers/reviewControllers');

const auth = require('../middleware/auth');
router.get('/:id/reviews', getBookReviews);
router.post('/:id/reviews', auth, addReview);
router.put('/:id/reviews/:reviewId', auth, editReview);
router.delete('/:id/reviews/:reviewId', auth, deleteReview);

module.exports = router;
