const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 5},
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
