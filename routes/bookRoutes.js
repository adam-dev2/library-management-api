const express = require('express');
const router = express.Router();
const {getAllBooks,getByID,createBook,editBook,deleteBook, uploadBookCover} = require('../controllers/booksControllers');
const upload = require('../middleware/upload');

router.get('/',getAllBooks)
router.get('/:id',getByID);
router.post('/',createBook);
router.put('/:id',editBook);
router.delete("/:id",deleteBook);
router.post('/:id/upload-cover',upload.single('cover'),uploadBookCover);

module.exports = router;