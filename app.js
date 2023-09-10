const express = require('express');
const app = express();
require('dotenv').config();

require('./model/todoModel');


//Body Parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const mongoose = require('mongoose');

//Connection With DataBase
const { MONGODB_URI } = require('./config/keys');
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .catch((err) => console.log("Error Occured With DataBase: " + err));




//API Router
const api = require('./api/api');
app.use('/api', api);

//Set for View Engine - EJS
app.set('view engine', 'ejs');

//Serving Static Public Files
app.use(express.static('public'));


//Middleware for Router
const router = require('./router/router');
app.use('/ejs', router);


//In Case of Production
app.use(express.static('client/build'));
const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('ToDo-MERN - App Started');
});