require('dotenv').config();
const express = require('express');
const { userRouter } = require('./routers/user.routes');
// const { notesRouter } = require('./routes/notes.routes');
const { connection } = require('./config/database');
const { authenticate } = require('./middleware/auth.middleware');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());
app.use('/users', userRouter);
app.use(authenticate);
// app.use('/notes', notesRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to database');
    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went')
    }
    console.log(`Server running at port http://localhost:${process.env.port}/`)
})