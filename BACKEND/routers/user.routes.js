const express = require('express');
const { userModel } = require('../models/user.model');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.get('/', async (req, res) => {
    try {
        const data = await userModel.find();
        res.send(data);
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }


})

userRouter.post('/register', async (req, res) => {
    let { username, password, repeat_password, name, email } = req.body;
    try {
        if (password != repeat_password) {
            res.send({ "Message": 'Your password is not matching' });
            return;
        }
        let data = await userModel.find({ email });
        if (data.length > 0) {
            res.send({ "Message": "Your email address is already resgistered" });
        } else {
            bcrypt.hash(password, 5, async (err, secure_password) => {
                if (err) {
                    console.log({ 'err': err })
                } else {
                    const data = new userModel({ username, password: secure_password, name, email });
                    await data.save()
                    res.send({ "Message": `${data.username} has successfully created` });
                    console.log(data);
                }
            })
        }
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await userModel.find({ email });
        if (data.length > 0) {
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) {
                    console.log({ 'err': err });
                    console.log('Something went wrong');
                } else {
                    const token = jwt.sign({ userID: data[0]._id }, process.env.key)
                    res.send({ "Message": "Login successful", "token": token });
                    console.log(data);
                }
            });
        } else {
            res.send({ "Message": "Please Sign-up First" })
        }
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }
})

module.exports = { userRouter }