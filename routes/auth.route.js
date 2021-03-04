const express = require('express');

const router = express.Router();

const { 

} = require('../controllers/auth.controller');

// Login a user
router.post('/login', loginUser);

// Create a new user
router.post('/signup', signupUser);

module.exports = router;