const validator = require('validator')

const validate = (name, email, password, confirmPassword) => {
    if (!name || !email || !password || !confirmPassword) {
        throw Error('all fields required')
    }

    if (!validator.isEmail(email)) {
        throw Error('email not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('password not strong')
    }

}

module.exports = validate