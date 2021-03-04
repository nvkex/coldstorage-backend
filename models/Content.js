const mongoose = require('mongoose')
const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        default: 'anime'
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    ref: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: new Date()
    },
    slug: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    language: {
        type: String
    },
    hosts: {
        type: String
    },
    downloads: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    summary: {
        type: String
    },
    mediaInfo: {
        type: String
    },
    downloadLinks: {
        type: Array,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Content', ContentSchema)