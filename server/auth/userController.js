const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require("./User")


const userRegister = async (req, res) => {
    try {
        const { email, password, username, firstName, lastName } = req.body
        const userExist = await User.findOne({ email })
        
        if (userExist) {
            res.status(409).json({ status: 'Failed', message: "User already exists"})
        }
        
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: hashPassword,
            username,
            firstName,
            lastName
        })
        
        await newUser.save()
        
        const token = jwt.sign({ userId: newUser._id, email: newUser.email}, process.env.JWT_SECRET, { expiresIn: '1h'})
        
        res.status(200).json({ status: 'Success', message: 'Registration successful', token, user: newUser })
    } catch (error) {
        console.error('Registration Error:', error)
        res.status(400).json({ status: 'Failed', message: 'Password or email required!', error: error.message})
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            res.status(401).json({ status: 'Failure', message: 'Invalid email'})
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) {
            res.status(401).json({ status: "Failed", message: 'Invalid Password'})
        }

        const token = jwt.sign(
            {userID: foundUser._id, email: foundUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        )
        res.status(200).json({ status: 'Success', userID: foundUser._id})
    } catch (error) {
        res.status(400).json({ status: 'Failed', message: 'Password or email required!', error: error.message})
    }
}


module.exports = { userLogin, userRegister }