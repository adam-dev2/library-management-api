const express = require('express');
const router = express.Router();
const {getAllBooks,getByID,createBook,editBook,deleteBook} = require('../controllers/booksControllers')

router.get('/',getAllBooks)
router.get('/:id',getByID);
router.post('/',createBook);
router.put('/:id',editBook);
router.delete("/:id",deleteBook);

module.exports = router;