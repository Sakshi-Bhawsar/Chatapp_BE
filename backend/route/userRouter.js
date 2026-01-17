const express = require('express')
const User = require('../schema/user')
const auth = require('../middleware/auth')
const { getAllUser } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.get("/all/users",auth,getAllUser)

userRouter.delete('/user',auth,async(req,res)=>{
       const {email} = req.body
       if(!email){
        res.status(400).send("email required")
       }

       const deletedUser = User.deleteOne({email})
       if(deletedUser){
        res.status(200).send("user delted")
       }else{
        res.status(404).send("user not found")
       }

})


module.exports = userRouter;