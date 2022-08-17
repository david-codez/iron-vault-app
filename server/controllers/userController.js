const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const GymMember = require('../models/GymMemberModel')


const getAllUsers = asyncHandler( async(req, res) => {
    console.log('method called')
    const users = await GymMember.find() 
    console.log(users)
    res.status(200).json(users)

})

// @desc Register New User
//@route  POST /api/users/
//@access Public
const registerUser = asyncHandler(async(req,res) => {
    console.log('server reached')
    console.log(req.body)
    const { username,firstName, lastName, email, password, admin} = req.body
    console.log(username, firstName, lastName, email, password)
    if(!username || !firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    if(admin === null) {
        admin = false
    }

    //check if user exists
    const userExists = await GymMember.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create User
    const member = await GymMember.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        admin
    })

    //check to make sure user was created
    if(member) {
        res.status(201).json({
            _id: member.id,
            admin: member.admin,
            name: member.firstName,
            email: member.email,
            token: generateToken(member._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

})

// @desc Authenticate a User
//@route  POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res) => {

    const {email, password} = req.body

    //check for user email
    const user = await GymMember.findOne({email})

    if(user && await bcrypt.compare(password,user.password)) {
        res.json({
            _id: user.id,
            admin: user.admin,
            name: user.firstName,
            email: user.email,
            token: generateToken(user._id),

        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc Get User Data
//@route  GET /api/users/me
//@access Private
const getMe = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)

})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers
}