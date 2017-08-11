const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//----Mongodb database!!----
//Connect to database 'meanauth'
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});
//----------------------------
const app = express();

//ROUTES FOLDER
const users = require('./routes/users');

//---Middleware---
//CORS middlware
app.use(cors());
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routes defined in routes folder, at /users/xxx
app.use('/users', users);
//----------------------------

// Index page route!
app.get('/', (req,res) =>{
    res.send('Invalid endpoint');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server started on port '+PORT);
});
