const validator = require('validator')

const validate=(fullName,email,password)=>{
    if(!fullName || !email || !password){
        throw Error('all fields required')
    }

    if(!validator.isEmail(email)){
        throw Error('email not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('password not strong')
    }
    
}

module.exports = validate