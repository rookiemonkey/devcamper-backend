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
        min: [1, 'Rating must be atleast 1'],
        max: [10, `Rating can't be more than 10`],
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

// user will only be able to add 1 review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// static method to getAverageRating 
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
    const result = await this.aggregate([
        {
            $match: { bootcamp: bootcampId } // review field to match
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRating: { $avg: '$rating' }
                // averageRating field from bootcamp
                // aggregate the rating field from reviews
            }
        }
    ])

    // update the bootcamp's averageRating    
    await this
        .model('Bootcamp')
        .findByIdAndUpdate(bootcampId, {
            averageRating: Math.ceil(result[0].averageRating)
        })
}

ReviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.bootcamp)
})

ReviewSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.bootcamp)
})

module.exports = mongoose.model('Review', ReviewSchema)