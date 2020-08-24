const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Course title is required']
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    weeks: {
        type: String,
        required: [true, 'Course number of weeks is required']
    },
    tuition: {
        type: Number,
        required: [true, 'Course tuitions cost is required']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Course minimum skill is required'],
        enum: ['beginner', "intermediate", "advanced"]
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    bootcamp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp',
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Course', CourseSchema)