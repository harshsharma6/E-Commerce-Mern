const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
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
    pic: {
        type: String,
        required : true
    }
})


// for hashing password
adminSchema.pre('save',async function(next) {
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
adminSchema.methods.generateAuthToken = async function(){
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
const Admin  = mongoose.model('ADMIN', adminSchema);
module.exports = Admin;