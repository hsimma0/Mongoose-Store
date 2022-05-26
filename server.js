// DEPENDECIES
const express = require('express');
const app = express();
require('dotenv').config();
// const Product= require('./models/product.js');
const mongoose = require('mongoose');
const productController = require('./controllers/product');
const methodOverride= require('method-override');
// const methodOverride = require('method-override');

//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// DATABASE CONNECTION ERROR/SUCCESS
//DEFINE CALLBACK FUNCTIONS FOR VARIOUS EVENTS
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'is mongo not running?' ));
db.on('connected',() => console.log('mongo connected'));
db.on('disconnected', () => console.log('monog disconnected'));

// MOUNT MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.use('/product', productController);

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => 
    console.log(`Hi I am Andre, and I am listening to : ${PORT}`)
)