//imports
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");

//create express server
const app = express();

//DB connection
connectDB();

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(3000, () => {
    console.log("Listening.....");
})