const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { createServer } = require('http')
const {errorHandler} = require('./middleware/errorMiddleware')
const { Server } = require('socket.io')


connectDB()
const port = process.env.SERVER_PORT
const io = new Server(httpServer,{
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {

})




const app = express()

// const corsOptions = {
//     origin: "*",
//     methods: ['GET', 'PUT', 'POST'],
//     preflightContinue: true,
// }

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(session({ secret: process.env.JWT_SECRET, resave: true, saveUninitialized: true }))
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.use("/api/users", require('./routes/userRoutes'))


const server = app.listen(port, () => console.log(`Server started on port ${port}`))
httpServer.listen({port})