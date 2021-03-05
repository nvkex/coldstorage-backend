const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    joinedOn: {
        type: Date,
        default: new Date()
    },
    password: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        default: 'NEW'
    },
    flagged:{
        type: Boolean,
        default: false
    },
    defaultIP:{
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    uniqueToken: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('User', UserSchema)