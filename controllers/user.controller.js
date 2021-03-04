const { nanoid } = require('nanoid');
const Content = require('../models/Content');
const User = require('../models/User');
const Recent = require('../models/Recent');
const mongoose = require('mongoose');

/**
 * Return all contents created by users
 * @param {*} req 
 * @param {*} res 
 */
exports.userContents = (req, res) => {
    const user = req.header.user;
    Content.find({ author: user })
        .then(data => {
            res.status(200).send({ data })
        })
        .catch(err => {
            res.send({ error: err })
        })
}

/**
 * Get User info.
 * @param {*} req 
 * @param {*} res 
 */
exports.userInfo = (req, res) => {
    const user = mongoose.Types.ObjectId(req.header.user);
    User.findOne({ _id: user })
        .then(data => {
            res.status(200).send({ data })
        })
        .catch(err => {
            res.send({ error: err })
        })
}