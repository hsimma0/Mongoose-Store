// DEPENDECIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product.js');

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

// SEED DATA
const productSeed = require('./models/productSeed.js');
app.get('/products/seed', (req,res) => {
    res.redirect('/products'); //change to redirect after testing
});

//ROUTES
// INDEX
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs',{ //change to render after testing
            products: allProducts,
        });
    });
})

// NEW
app.get('/products', (req,res) => {
    res.render('new.ejs'); //change to render after testing
})

// D

// U

// CREATE
app.post('/products', (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Product.create(req.body, (error, createdBook) => {
        res.redirect('/products'); //change to redirect after testing
    });
}) 

// E

// SHOWS
app.get('/product/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', { //change to render after testing
            product: foundProduct,
        });
    });
});


// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Hi I am Andre, and I am listening to : ${PORT}`)
})