const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

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

// hash the password before saving
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = new mongoose.model('User', UserSchema);