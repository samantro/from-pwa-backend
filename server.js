const express = require('express');
const app = express()
const db = require('./database/connect');
const userRouter = require('./routes/user');
db.connect(app);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// routes
app.use('/user', userRouter);
