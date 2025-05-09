const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    username: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    createdAt: {
        type: Date,
        default: Date.now        // Automatic timestamps
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User