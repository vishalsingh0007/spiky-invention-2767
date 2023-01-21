const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: String,
    username: String,
    email: String,

    password: String,
    repeat_password: String


})

const userModel = mongoose.model('users', userschema);

module.exports = { userModel };