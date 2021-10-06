const User = require('../model/user');
const bcrypt = require('bcryptjs');
const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require('validator')

const createUser = async (req, res) => {
    const body = req.body
    try{

        const createdUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.userName,
            email: body.email,
            password: body.password,
        });

        let savedUser = await createdUser.save();

        res.json({ message: "success", payload: savedUser })
    }catch(error) {
        res.status(500).json({ message: "error", error: error.message })
    }
}

const login = (req, res) => {

}

module.exports = {
    createUser,
}