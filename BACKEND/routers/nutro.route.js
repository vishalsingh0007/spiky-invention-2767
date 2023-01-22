const express = require('express');
const { nutroModel } = require('../models/nutro.model');
const nutroRouter = express.Router();
const bcrypt = require('bcrypt');

nutroRouter.get('/', async (req, res) => {
    try {
        const data = await nutroModel.find();
        res.send(data);
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }
})

nutroRouter.post('/create', async (req, res) => {
    try {
        const data = new nutroModel(req.body);
        await data.save();
        res.send({ "Message": `Nutritions has successfully created` });
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }
})

nutroRouter.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const note = await nutroModel.findOne({ "_id": id });
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try {
        if (userID_making_req != userID_in_note) {
            res.send('You are not authorized to update the Nutritions')
        } else {
            const update = req.body;
            await nutroModel.findByIdAndUpdate({ "_id": id }, update);
            res.send('Nutritions has been updated');
        }
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }
})

nutroRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const note = await nutroModel.findOne({ "_id": id });
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;

    try {
        if (userID_making_req != userID_in_note) {
            res.send({ "Message": 'You are not authorized to delete the Nutritions' })
        } else {
            await nutroModel.findByIdAndDelete({ "_id": id });
            res.send({ "Message": "Nutritions has been deleted" });
        }

    } catch (error) {
        console.log({ 'error': error });
        console.log(data);
    }
})


module.exports = { nutroRouter }