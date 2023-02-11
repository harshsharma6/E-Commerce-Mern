const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// import mongoose from 'mongoose';
// const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema({
    userName : {
        type: String,
        required:true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type : Number,
        required:true
    },
    password : {
        type: String,
        required: true
    },
    cpassword : {
        type: String,
        required : true
    },
    pic : {
        type: String,
        required : true
    },
    tokens : [
        {
            token : {
                type: String,
                required : true
            }
        }
    ]
})


// for hashing password
customerSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this .password = await bcrypt.hash(this.password, 12);
        this .cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// // at the time of update
// userSchema.pre('updateOne',async function(next) {
//     if(this.isModified('new_pass')){
//         this .password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });

// generating token
customerSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token :token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

// Collection Creation
const Customer  = mongoose.model('CUSTOMER', customerSchema);
module.exports = Customer;