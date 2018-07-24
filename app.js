const express = require('express');
var session    = require('express-session');
const app = express();
const passport = require('passport');
const mysql = require('mysql');
const poeticController = require('./controllers/poeticController');
const myDatabase = require('./db');
const bodyParser = require('body-parser');
const env  = require('dotenv').load();
const flash = require('connect-flash');

//for bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


//Models
var models = require("./models");

//load passport strategies
require('./config/passport/passport.js')(passport,models.user);



//setting templatting engine
app.set('view engine', 'ejs');

//static file management
app.use(express.static('./public'));

//linking controller file

poeticController(app, myDatabase(mysql), passport);


//Sync Database
models.sequelize.sync().then(function(){
console.log('Nice! Database looks fine')

}).catch(function(err){
console.log(err,"Something went wrong with the Database Update!")
});

app.listen(3000);
console.log('You are listening to port 3000.');
