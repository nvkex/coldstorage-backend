const express = require('express');

const router = express.Router();

// Middlewares
const {
    verifyToken,
    checkExpiry
} = require('../middlewares/auth.middleware');

// Controllers
const { 
    userContents,
    userInfo,
    updateUserInfo,
    cnfDeleteUser,
    deleteUserPermanently,
    uploadContent,
    updateContent,
    deleteContent
} = require('../controllers/user.controller');

// Get all user uploaded contents
router.get('/contents', [verifyToken], userContents);

// Get user account info
router.get('/info', [verifyToken], userInfo);

// Update user account
router.put('/update-user-info', [verifyToken, checkExpiry], updateUserInfo);

// Send confirmation token for deleting account.
router.delete('/cnf-delete-user', [verifyToken, checkExpiry], cnfDeleteUser);

// Delete a user permanently
router.delete('/delete-user', [verifyToken, checkExpiry], deleteUserPermanently);

// Upload content
router.post('/upload-content', [verifyToken, checkExpiry], uploadContent);

// Update existing content created by user
router.put('/update-content/:contentId', [verifyToken, checkExpiry], updateContent);

// Delete content created by user
router.delete('/delete-content/:contentId', [verifyToken, checkExpiry], deleteContent);

module.exports = router;