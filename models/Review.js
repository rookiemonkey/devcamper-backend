const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 100,
        required: [true, 'Review title is required']
    },
    text: {
        type: String,
        required: [true, 'Review text is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Review rating between 1 to 10']
    },
    bootcamp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', ReviewSchema)