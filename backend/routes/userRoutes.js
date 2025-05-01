const express = require('express');
const auth = require('../middleware/authMiddleware');
const { userProfile, updateProfile } = require('../controllers/userControllers');
const router = express.Router();

router.get('/:id', auth, userProfile);
router.patch('/:id', auth, updateProfile);

module.exports = router;

