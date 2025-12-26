const validate = require("../utilis/validate")
const bcrypt = require("bcrypt")
const User = require("../schema/user")
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        validate(fullName, email, password)

        const existUser = await User.findOne({ email: email })
        if (existUser) {
            res.status(400).send({ sucess: false, meassage: 'user alredy exsit' })
        }

        const bcryptPassword = await bcrypt.hash(password, 10)

        const user = new User({
            fullName,
            email,
            password: bcryptPassword
        })
        await user.save()
        res.status(201).json({
            sucess: true,
            meassage: 'user created sucessfully'
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
        const { fullName, email, password } = req.body
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
                sucess: true,
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

const logOut = async(req,res) => {
    try {
    res.cookie('token',null,{expires:new Date(Date.now())}).status(200).send({
        meassage:"user logut sucessfully"
    })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            sucess: false,
            error: err.message
        })

    }
}

module.exports = { signUp, login,logOut }