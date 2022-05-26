const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productSeed = require('../models/productSeed.js');
//ROUTES
router.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => { });
    Product.create(productSeed, (error, data) => {
        red.redirect('/product');
    });
});

// INDEX
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs',{ //change to render after testing
            product: allProducts,
        });
    });
});

// NEW
router.get('/new', (req,res) => {
    res.render('new.ejs'); //change to render after testing
});

// DELETE
router.delete('/:id', (req,res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/products")
    })
})

// UPDATE
router.put("/:id", (req, res) => {
    // if (req.body.completed === "on") {
    //   req.body.completed = true
    // } else {
    //   req.body.completed = false
    // }
  
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`)
      }
    )
  })

// CREATE
router.post('/', (req, res) => {
    
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }

    Product.create(req.body, (error, createdProduct) => {
		res.redirect('/products');
    });
})

// EDIT
router.get('/:id/edit',(req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
        item: foundProduct,
        })
    })
})

// SHOW
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', { //change to render after testing
            product: foundProduct,
        });
    });
});

// BUY

module.exports =router;