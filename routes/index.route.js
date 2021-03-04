const express = require('express');

const router = express.Router();

const { 
    getCategories,
    getItemList,
    getAllItems,
    getItem
} = require('../controllers/index.controller');

// Get major categories
router.get('/c', getCategories);

// Get all items uploaded till date
router.get('/all', getAllItems);

// Get items by category
router.get('/c/:category', getItemList);

// Get details of an item by ID
router.get('/item/:itemId', getItem);

module.exports = router;