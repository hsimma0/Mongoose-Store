const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    description: String,
    image: String,
    price: { type: Number, minimum: 0},
    qty: { type: Number, minimum: 0},
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
