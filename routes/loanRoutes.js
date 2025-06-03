const express = require('express');
const router = express.Router();
const {borrowBook,returnBook,getAllLoans,getUserLoans} = require('../controllers/loanControllers');

const auth = require('../middleware/auth');

router.post('/borrow', auth, borrowBook);
router.put('/:id/return', auth, returnBook);
router.get('/', auth, getAllLoans);
router.get('/user/:userId', auth, getUserLoans);

module.exports = router;
