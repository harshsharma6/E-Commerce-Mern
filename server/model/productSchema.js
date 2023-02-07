const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
    
    category:{
        type: String,
        required: true
    },
    product_name : {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true       
    },
    product_image:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    created_at:{
        type: String,
        required: true
    },
    updated_at:{
        type: String,
        required: true 
    }
})

// Collection Creation
const Product  = mongoose.model('PRODUCT', productSchema);
module.exports = Product;