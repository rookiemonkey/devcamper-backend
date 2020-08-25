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
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

// static method to getAverageCost of tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    const result = await this.aggregate([
        {
            $match: { bootcamp: bootcampId } // course field to match
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ])

    // update the bootcamp's averagecost    
    await this
        .model('Bootcamp')
        .findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(result[0].averageCost / 10) * 10
        })
}

// call getAverageCost before remove / after save
// since its a static method like Course.getAverageCost()
// and not instance method like foundCourse.getAverageCost()

CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp)
})

CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema)