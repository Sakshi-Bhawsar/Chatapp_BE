const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   email: {
      type: String,
      require: true,
      unique: true
   },
   pic:{
        type:String,
        require:true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
   },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
   password: {
      type: String,
      require: true
   }
},{timestamps:true})

const User = mongoose.model('User', userSchema)
module.exports = User