
const mongoose = require('mongoose');

const Adminschema = mongoose.Schema({
    name: String,
    Adminname: String,
    email: String,
    password: String,
    repeat_password: String
})

const AdminModel = mongoose.model('Admins', Adminschema);

module.exports = { AdminModel };