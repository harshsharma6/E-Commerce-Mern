const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const categorySchema = new mongoose.Schema({
    category_name : {
        type: String,
        required:true
    }
})









// Collection Creation
const Category  = mongoose.model('CATEGORY', categorySchema);
module.exports = Category;