const validate = require("../utilis/validate")
const bcrypt = require("bcrypt")
const User = require("../schema/user")
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, pictureUrl } = req.body
        validate(name, email, password, confirmPassword)

        const existUser = await User.findOne({ email: email })
        if (existUser) {
            res.status(400).send({ sucess: false, meassage: 'user alredy exsit' })
            return
        }

        if (password !== confirmPassword) {
            res.status(400).send({ sucess: false, meassage: 'password and confirm password not match' })
            return
        }

        const bcryptPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password: bcryptPassword,
        })
        if (pictureUrl) {
            user.pic = pictureUrl
        }
        await user.save()
        res.status(201).json({
            success: true,
            message: 'user created successfully'
        })

    } catch (err) {
        res.status(500).send({
            sucess: false,
            error: err.message
        })
        console.log(err)
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(401).send({
                sucess: false,
                meassage: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ _id: user._id, name: user.fullName }, process.env.JWTSECRETE, { expiresIn: "24h" })
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            })
            user.password = undefined
            res.status(201).send({
                success: true,
                meassage: "user created",
                data: user
            })
        } else {
            res.status(400).send({
                sucess: false,
                error: "not valid user"
            })
        }

    } catch (err) {
        res.status(500).send({
            sucess: false,
            error: err.message
        })
        console.log(err)
    }
}

const logOut = async (req, res) => {
    try {
        res.cookie('token', null, { expires: new Date(Date.now()) }).status(200).send({
            meassage: "user logut sucessfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            error: err.message
        })

    }
}

module.exports = { signUp, login, logOut }