const mongoose = require('mongoose')

const GymMemberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please add a username']
    },
    firstName: {
        type: String,
        required: [true, 'please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    admin: {
        type: Boolean,
    }, 

    
}, {
    timestamps: true
})



module.exports = mongoose.model("GymMember", GymMemberSchema)