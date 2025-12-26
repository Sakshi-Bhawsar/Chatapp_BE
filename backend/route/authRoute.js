const express = require('express')
const { signUp, login, logOut } = require('../controllers/authController')
const auth = require('../middleware/auth')

const authRouter = express.Router()
authRouter.post('/signup',signUp)
authRouter.post('/login',login)
authRouter.post('/logout',auth,logOut)

module.exports = authRouter