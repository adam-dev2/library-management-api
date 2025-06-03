const express = require("express");
const router = express.Router();
const {getAllAuthors,getAuthorByID,createAuthor,editAuthor,deleteAuthor} = require('../controllers/authorController');
const auth = require("../middleware/auth");

router.get('/',getAllAuthors);
router.get('/:id',getAuthorByID);
router.post('/',auth,createAuthor);
router.put('/:id',auth,editAuthor);
router.delete('/:id',auth,deleteAuthor);

module.exports = router;