const express = require('express');
const { register,login,getAllUsers,getUserByID,profilePictureUpload } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = require('../middleware/upload')

router.post('/register',register);
router.post('/login',login);
router.get('/',auth,getAllUsers);
router.get('/:id',auth,getUserByID);
router.post('/:id/upload-profile-picture',upload.single('profile'), profilePictureUpload);

module.exports = router;