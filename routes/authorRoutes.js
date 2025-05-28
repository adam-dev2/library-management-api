const express = require("express");
const router = express.Router();
const {getAllAuthors,getAuthorByID,createAuthor,editAuthor,deleteAuthor} = require('../controllers/authorController')

router.get('/',getAllAuthors);
router.get('/:id',getAuthorByID);
router.post('/',createAuthor);
router.put('/:id',editAuthor);
router.delete('/:id',deleteAuthor);

module.exports = router;