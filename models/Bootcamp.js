const mongoose = require('mongoose');
const slugify = require('slugify');
const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');
const geocoder = require('../utils/geocoder');

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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// reverse populate with virtual fields
BootcampSchema.virtual('courses', {
    ref: 'Course', // reference schema
    localField: '_id', // local source information
    foreignField: 'bootcamp', // field in courses being referenced
    justOne: false // since we want an array
})

// cascade delete courses when bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
    let bootcampToBeRemoved = this

    await bootcampToBeRemoved
        .model('Course')
        .deleteMany({ bootcamp: bootcampToBeRemoved._id })
    next();
})

// create slug from name before save
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// geocode the address before save
BootcampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);

    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].street,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    }

    // since we have formattedAddress
    // we will prevent the this.address to be saved
    this.address = undefined

    next();
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);
