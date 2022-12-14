const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError } = require('../errors/UnauthenticatedError')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    const response = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token
    }
    return response
}

module.exports = { login }
