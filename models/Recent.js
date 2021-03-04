const mongoose = require('mongoose')
const RecentSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    content:[{
        cid: {
            type: String
        },
        slug: {
            type: String
        },
        date: {
            type: Date
        }
    }],
    lastUpdated: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('Recent', RecentSchema)