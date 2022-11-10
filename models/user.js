const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
    username: {
=======
    firstName: {
>>>>>>> dev
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 2
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        maxlength: 50,
        minlength: 2
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: 2,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Please provide password']
    }
})
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )
}
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

const User = mongoose.model('User', UserSchema)

module.exports = User
