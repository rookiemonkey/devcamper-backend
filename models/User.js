const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Please provide a valid email');
            }
        },
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'publisher']
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
        required: [true, 'Password is required']
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
}, { timestamps: true });

module.exports = new mongoose.model('User', UserSchema);