const express = require('express');
const { createUser, loginUser, logoutUser, verifyUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/me', verifyToken, verifyUser);

// router.post('/login', loginUser);

module.exports = router;