const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//path required for giving path
const path = require('path');

// assign path with join function taking 3 parameters __dirname then relative path then flder name
const productsFolder = path.join(__dirname, "..", "products");

// require another library of express to upload file
const upload = require('express-fileupload')
router.use(upload());

require('../db/conn');
const Admin = require('../model/adminSchema');
const Category = require('../model/categorySchema');
const { Product } = require('../../client/src/Components/Product');

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

router.post('/add_product', (req, res) => {

    //checking files ???????
    // to request files from body
    if (req.files) {
        console.log(req.files);
    }

    // in req file putting our coming (key - pic) from frontend
    const { product_image } = req.files;

    const { product_name , description, price, created_at, updated_at } = req.body;
    if (!product_name || !description || !price || !product_image || !created_at || !updated_at) {
        return res.status(422).json({ error: "Can not use empty field" });
    } else {

        console.log(productsFolder)
        // Applying .mv to our pic key to move the file into our folder 
        pic.mv(path.join(productsFolder, product_image.name))

        // create document for product
        const product = new Product({  product_name , description, price, created_at, updated_at, product_image: product_image.name });


        Product.findOne({ product_name : product_name }).then((productExist) => {
            // checking product exists of not in DB
            if (productExist) {
                return res.status(422).json({ error: "Product Name Already Exists" });
            }

            // save product in the collection
            product.save().then(() => {
                res.status(200).json({ message: "Product Saved" });
            }).catch((err) => res.status(500).json({ error: "Failed to Save Product" }));
        }).catch(err => { console.log(err) });
    }
});

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