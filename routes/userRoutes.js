const express = require('express');
const { register,login,getAllUsers,getUserByID,profilePictureUpload } = require('../controllers/userController');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/',getAllUsers);
router.get('/:id',getUserByID);
router.post('/upload-profile-picture',profilePictureUpload);

module.exports = router;