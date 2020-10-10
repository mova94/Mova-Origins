//imports
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require('cors');

//create express server
const app = express();

//DB connection
connectDB();

//init middleware
app.use(express.json({extended: false}));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port: ${port} .....`);
})