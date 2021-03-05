const { nanoid } = require('nanoid');
const Content = require('../models/Content');
const User = require('../models/User');
const Recent = require('../models/Recent');
const mongoose = require('mongoose');

/**
 * Return all contents created by users
 * @param {Object} req 
 * @param {Object} res 
 */
exports.userContents = (req, res) => {
    Content.find({ author: mongoose.Types.ObjectId(req.user) })
        .then(data => {
            res.status(200).send({ data })
        })
        .catch(err => {
            res.send({ error: err })
        })
}

/**
 * Get User info.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.userInfo = (req, res) => {
    User.findOne({ _id:   mongoose.Types.ObjectId(req.user) })
        .then(data => {
            res.status(200).send({ data })
        })
        .catch(err => {
            res.send({ error: err })
        })
}

/**
 * Update User info.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateUserInfo = (req, res) => {
    const { updateData } = req.body;

    if (updateData.flagged || updateData.defaultIP || updateData.joinedOn || updateData.userType ||  updateData.email) {
        res.status(401).send({ error: 'Not Allowed' })
    }
    else {
        User.updateOne({ _id:  mongoose.Types.ObjectId(req.user) }, updateData)
            .then(data => {
                res.status(200).send({ data })
            })
            .catch(err => {
                res.send({ error: err })
            })
    }

}

/**
 * Send delete confirmation to user.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.cnfDeleteUser = (req, res) => {
    User.findOne({ _id:  mongoose.Types.ObjectId(req.user) })
    .then(data => {
        if(data.deleted == true){
            res.status(404).send()
        }
        else{
            const token = await bcrypt.hash(req.body.password, req.user);
            User.updateOne({_id:  mongoose.Types.ObjectId(req.user)}, {deleted: true, uniqueToken: token})
            then(data => {
                res.status(202).send({token});
            })
            .catch(err => {
                res.status(400).send()
            })
        }
    })
}