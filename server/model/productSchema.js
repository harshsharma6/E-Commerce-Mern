const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
    product_name : {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true       
    },
    price:{
        type: Number,
        required:true
    },
    created_at:{
        type: Date,
        required: true
    },
    updated_at:{
        type: Date,
        required: true 
    }
})

// Collection Creation
const Product  = mongoose.model('PRODUCT', productSchema);
module.exports = Product;