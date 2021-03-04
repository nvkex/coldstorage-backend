const express = require('express');

const router = express.Router();

const { 
    uploadItem,
    updateItem,
    adminLogin,
    verifyAdmin
} = require('../controllers/admin.controller');

// Upload content as an admin
router.post('/upload', uploadItem);

// Update existing item as an admin
router.put('/update/:contentId', updateItem);

// Delete\Block existing item as admin
router.delete('/delete/:contentId', deleteItem);

// Login an admin
router.post('/login', adminLogin);

// Verify admin
router.post('/verify', verifyAdmin);

module.exports = router;