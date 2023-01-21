const express = require('express');
const { connection } = require('mongoose');
const app = express();

app.use(express.json());

app.listen(process.env.port, async () => {
    try {

        await connection;
        console.log('Connected to server');
    } catch (error) {
        console.log('Something went wrong while connecting to the server');
        console.log({ "error": error });
    }
})