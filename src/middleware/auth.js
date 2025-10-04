const jwt = require('jsonwebtoken')
const User = require('../schema/user')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).send({
                meassage: "please login"
            })
        }
        const decode = await jwt.verify(token, process.env.JWTSECRETE)
        const id = decode._id;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('user not found')
        }
        req.user = user
        next();
    } catch (err) {
        console.log(err)
        res.status(500).send({
            meassage: "something want wrong"
        })
    }

}
module.exports =auth