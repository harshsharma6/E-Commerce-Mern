const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



require('../db/conn');
const Admin = require('../model/adminSchema');
const Category = require('../model/categorySchema');

router.get('/', (req, res) => {
    res.send(`Hello World From The Server Router js`);
});

// login route
router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message : "signin"});
    try {
        // let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz Fill Both Fields" });
        }

        const userLogin = await Admin.findOne({ email: email });
        // console.log(userLogin);

        if (!userLogin) {
            res.status(402).json({ error: "User Not Found" });
        } else {
            const passwordCheck = await bcrypt.compare(password, userLogin.password);
            if (!passwordCheck) {
                res.status(402).json({ error: "Incorrect Credentials" });
            } else {
                // token = await userLogin.generateAuthToken();

                // res.cookie("jwtoken", token, {
                //     expires:  new Date(Date.now()+25892000000),
                //     httpOnly :true
                // });
                res.json({ message: "User Login Successfull" });
            }
        }

    } catch (err) {
        console.log(err);
    }
});

router.post('/add_category',(req,res)=>{
    const {name} = req.body;
    const category = new Category({ name });

    category.save().then(() => {
        res.status(200).json({ message: "Category Saved" });
    }).catch((err)=>{console.log(err);});
});

router.post('/add_product',(req,res)=>{
    const {name} = req.body;
    const category = new Category({ name });

    category.save().then(() => {
        res.status(200).json({ message: "Category Saved" });
    }).catch((err)=>{console.log(err);});
});

router.post('/get_admin_data', async(req,res)=>{
    try {
        const { email } = req.body;
        console.log(req.body);
        const userLogin = await Admin.findOne({ email: email });

        if (!userLogin) {
            res.status(402).json({ error: "User Not Found" });
        } else {
            console.log("Working");
            res.json(userLogin);
        }
    } catch (err) {
        console.log(err);
    }

})


// //Using Async Await
// const useAsync = async () => {
//     try {
//         const admin1 = new Admin({
//             userName: "Dave Smith",
//             email: "dave@gmail.com",
//             phone: 9584958695,
//             password: "123",
//             cpassword: "123",
//             pic : "faculty.png"
//         })

//         const admin2 = new Admin({
//             userName: "Charles Grey",
//             email: "charles@gmail.com",
//             phone: 7869586978,
//             password: "123",
//             cpassword: "123",
//             pic : "employee.png" 
//         })

//         const usePromise = await Admin.insertMany([admin1,admin2])
//         console.log(usePromise);
//     } catch (error) {
//         console.log(error);
//     }
// }
// useAsync();

module.exports = router;