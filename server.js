// DEPENDECIES
const express = require('express');
// const res = require('express/lib/response');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product.js');
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

// SEED DATA
// const productSeed = require('./models/productSeed.js'); //Had .js
// app.get('/products/seed', (req,res) => {
//     Product.deleteMany({}, (err, allProducts) => {});
//     Product.create(productSeed, (err, data) => {
//         res.redirect('/products'); //change to redirect after testing
//     });
// });

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

// DELETE
app.delete('/products/:id', (req,res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/products")
    })
})

// UPDATE
app.put("/products:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
  
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        res.redirect(`/product/${req.params.id}`)
      }
    )
  })

// CREATE
app.post('/products', (req, res) => {
    
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }

    Product.create(req.body, (error, createdProduct) => {
		res.redirect('/products');
    })

    // res.render(req.body);
})

// EDIT
app.get('/products/:id/edit',(req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        })
    })
})

// SHOWS
app.get('/products/:id', (req, res) => {
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