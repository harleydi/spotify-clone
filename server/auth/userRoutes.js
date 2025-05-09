const { userLogin, userRegister } = require('./userController')

const express = require('express')


const router = express.Router()

// Routes
router.post('/register', userRegister)
router.post('/login', userLogin)



module.exports = router