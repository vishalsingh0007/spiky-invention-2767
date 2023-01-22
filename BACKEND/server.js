require('dotenv').config();
const express = require('express');
const { userRouter } = require('./routers/user.routes');
// const { notesRouter } = require('./routes/notes.routes');
const { adminRouter } = require('./routers/adminuser.route')
const { nutroRouter } = require('./routers/nutro.route')
const { connection } = require('./config/database');
const { authenticate } = require('./middleware/auth.middleware');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());
app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/nutros', nutroRouter);
app.use(authenticate);

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