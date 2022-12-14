const mongoose = require('mongoose')
const User = require('../models/user')

const PostingSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide name'],
            maxlength: 50
        },
        message: {
            type: String,
            required: [true, 'Please provide a posting'],
            maxlength: 200
        },
        status: {
            type: String,
            enum: ['current', 'fulfilled'],
            default: 'current'
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        },
        title: {
            type: String,
            required: [true, 'Please provide title'],
            maxlength: 50,
            minlength: 2
        },
        applicants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Posting', PostingSchema)
