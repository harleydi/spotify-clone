require('dotenv').config()
const express = require('express')
const userRoutes = require('./auth/userRoutes')
const connectDB = require('./config/db')

const app = express()

const PORT = 8000

// Connect to Database
connectDB()

app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Express!')
})

app.use('/auth', userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})