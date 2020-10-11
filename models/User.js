const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    confirmEmailToken: {
        type: String,
        select: false
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Boolean,
        default: false
    },
    otpKey: {
        type: String,
        select: false
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
    if (!this.isModified('password')) { return next(); }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// cascade delete relative data when user is deleted
UserSchema.pre('remove', async function (next) {
    let userToBeRemoved = this

    // returns all bootcamps of the userToBeRemoved in array
    const userBootcamps = await userToBeRemoved
        .model('Bootcamp')
        .find({ user: userToBeRemoved._id })

    // loop thru all the bootcamps of the user and delete it
    for (let i = 0; i <= userBootcamps.legnth - 1; i++) {
        // triggers the pre-remove hook and also deletes the image & reviews
        await userBootcamps[i].remove();
    }

    next();
})

// check the plain text pw to hashed pw
UserSchema.methods.checkPassword = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
}

// create a token for the user
UserSchema.methods.getToken = function () {
    return jwt
        .sign(
            { _id: this._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE_TIME }
        )
}

// create a reset password token for the user
UserSchema.methods.getPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10mins

    return resetToken;
}

// create an email confirmation token
UserSchema.methods.getConfirmEmailToken = function (next) {
    const confirmationToken = crypto.randomBytes(20).toString('hex');

    this.confirmEmailToken = crypto
        .createHash('sha256')
        .update(confirmationToken)
        .digest('hex');

    const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
    const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
    return confirmTokenCombined;
};

module.exports = new mongoose.model('User', UserSchema);