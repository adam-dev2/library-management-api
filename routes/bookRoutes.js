const express = require('express');
const router = express.Router();
const {getAllBooks,getByID,createBook,editBook,deleteBook, uploadBookCover} = require('../controllers/booksControllers');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.get('/',getAllBooks)
router.get('/:id',getByID);
router.post('/',auth,createBook);
router.put('/:id',auth,editBook);
router.delete("/:id",auth,deleteBook);
router.post('/:id/upload-cover',auth,upload.single('cover'),uploadBookCover);

module.exports = router;