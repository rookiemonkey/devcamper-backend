const mongoose = require('mongoose');
const slugify = require('slugify');
const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');

const BootcampSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            maxlength: [50, `Name can't be more than 50 characters`],
            required: [true, 'Name is required'],
        },
        slug: String,
        description: {
            type: String,
            maxlength: [500, `Descrition can't be more than 500 characters`],
            required: [true, 'Description is required'],
        },
        website: {
            type: String,
            validate(value) {
                if (!isUrl(value)) {
                    throw new Error('Please provide a valid URL');
                }
            },
        },
        phone: {
            type: String,
            maxlength: [20, `Phone number can't be more than 20 characters`],
        },
        email: {
            type: String,
            validate(value) {
                if (!isEmail(value)) {
                    throw new Error('Please provide a valid email');
                }
            },
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String,
        },
        careers: {
            type: [String],
            required: true,
            enum: [
                'Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Others',
            ],
        },
        averageRating: {
            type: Number,
            min: [1, 'Rating must be atleast 1'],
            max: [10, `Rating can't be more than 10`],
        },
        averageCost: Number,
        photo: {
            type: String,
            default: 'no-photo-jpg',
        },
        housing: {
            type: Boolean,
            default: false,
        },
        jobAssistance: {
            type: Boolean,
            default: false,
        },
        jobGuarantee: {
            type: Boolean,
            default: false,
        },
        acceptGi: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// create slug from name before save
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);
