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

//Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port: ${port} .....`);
})