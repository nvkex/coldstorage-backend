const { categories } = require('../data/categories')
const Content = require('../models/Content');

/**
 * Get all the current available categories.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getCategories = (req, res) => {
    res.send(categories)
}

/**
 * Get items by category.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getItemList = (req, res) => {
    const c = req.params.category
    const { page } = req.query
    Content.find({ category: c }).skip(10 * (page - 1)).limit(10 * page)
        .then(data => {
            res.send({ data, success: true })
        }).catch(err => {
            res.send({ success: false })
        })
}

/**
 * Get all items from every category
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllItems = async (req, res) => {
    const { page } = req.query
    Content.find().skip(10 * (page - 1)).limit(10 * page)
        .then(res => {
            res.send({ success: true, data: res })
        }).catch(err => {
            res.send({ success: false })
        })

}

/**
 * Get an item by ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getItem = (req, res) => {
    const { itemId } = req.params;
    Content.find({ slug: itemId })
        .then(res => {
            res.send({ success: true, data: res })
        }).catch(err => {
            res.send({ success: false })
        })
}

