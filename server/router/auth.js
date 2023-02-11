const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//path required for giving path
const path = require('path');

// assign path with join function taking 3 parameters __dirname then relative path then flder name
const productsFolder = path.join(__dirname, "..", "products");
const userFolder = path.join(__dirname, "..", "user_img");

// require another library of express to upload file
const upload = require('express-fileupload')
router.use(upload());

require('../db/conn');
const Admin = require('../model/adminSchema');
const Category = require('../model/categorySchema');
const Product = require('../model/productSchema');
const Customer = require('../model/customerSchema');


router.get('/', (req, res) => {
    res.send(`Hello World From The Server Router js`);
});


router.post('/register', (req, res) => {

    //checking files ???????
    // to request files from body
    if (req.files) {
        console.log(req.files);
    }

    // in req file putting our coming (key - pic) from frontend
    const { pic } = req.files;

    const { name: userName, email, phone,  password, cpassword } = req.body;
    if (!pic || !userName || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Can not use empty field" });
    } else if (password != cpassword) {
        return res.status(400).json({ error: "Password & Confirm Password Not Matched" });
    } else {

        console.log(userFolder)
        // Applying .mv to our pic key to move the file into our folder 
        pic.mv(path.join(userFolder, pic.name))

        // create document for user
        const user = new Customer({ userName, email, phone, password, cpassword, pic: pic.name });


        Customer.findOne({ email: email }).then((userExist) => {
            // checking user exists of not in DB
            if (userExist) {
                return res.status(422).json({ error: "Email Already Exists" });
            }

            // save user in the collection
            user.save().then(() => {
                res.status(200).json({ message: "User Saved" });
            }).catch((err) => res.status(500).json({ error: "Failed to Register" }));
        }).catch(err => { console.log(err) });

        // console.log(name);
        // console.log(email);
        // console.log(password);
        // res.json( {message : req.body});
        // res.send("registration page");
    }
});

// login route for Admin
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

// login route for User
router.post('/usersignin', async (req, res) => {
    // console.log(req.body);
    // res.json({message : "signin"});
    try {
        // let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz Fill Both Fields" });
        }

        const userLogin = await Customer.findOne({ email: email });
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

router.post('/add_category', (req, res) => {
    const { category_name } = req.body;
    const category = new Category({ category_name: category_name });

    category.save().then(() => {
        res.status(200).json({ message: "Category Saved" });
    }).catch((err) => { console.log(err); });
});


router.post('/get_admin_data', async (req, res) => {
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

    // in req file putting our coming (key - pic) from frontend
    const { product_image } = req.files;

    if (req.files) {
        console.log(req.files);
    }
    // const { product_name , description, price, created_at, updated_at } = req.body;
    const { category, product_name, description, price, created_at, updated_at } = req.body;
    if (!category || !product_name || !description || !price || !product_image || !created_at) {
        return res.status(422).json({ error: "Can not use empty field" });
    } else {

        console.log(productsFolder)
        // Applying .mv to our pic key to move the file into our folder 
        product_image.mv(path.join(productsFolder, product_image.name))

        // create document for product
        // const product = new Product({ product_name , description, price, created_at, updated_at, product_image: product_image.name });
        const product = new Product({ category, product_name, description, price, created_at, updated_at, product_image: product_image.name });


        Product.findOne({ product_name: product_name }).then((productExist) => {
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


router.get('/get_category', async (req, res) => {
    // const {category_name} = req.body;
    // const category = Category({ category_name });
    //Slightly working below ones
    // Category.find({}).then((category_found)=>{res.json(category_found)})
    await Category.find({}).then((cat) => {
        res.json(cat);
        // cat.map((category_found)=>{res.json(category_found.category_name)})
    })
})

router.get('/get_product', async (req, res) => {
    await Product.find({}).then((pro) => {
        res.json(pro);
    })
})
router.get('/get_pro_id/:id', async (req, res) => {
    console.log(req.params.id);
    await Product.find({_id: req.params.id}).then((pro_id) => {
        res.json(pro_id);
    })
})

router.post('/update_product', async (req, res) => {
    // storing info from db in variables
    const {product_image} = req.files;
    const { category, product_name, description, price, updated_at } = req.body;
    product_image.mv(path.join(productsFolder, product_image.name))
    console.log(req.body);
    const get_pro_name = Product.updateOne({ product_name: product_name }, { $set: { category, product_name, description, price, updated_at, product_image:product_image.name } }).then((get_info) => { res.json({ message: "Updated User Info" }) }).catch((error) => { res.status(402).json({ error: "Invalid Info" }); })
    
})

router.post('/change_pro_img', (req, res) => {
    // storing info from db in variables
    if (req.files) {
        console.log(req.files);
    }
    const {product_name} = req.body;
    const {product_image} = req.files;
    console.log(productsFolder);
    console.log(product_name);
    product_image.mv(path.join(productsFolder, product_image.name))
    Product.updateOne({product_name: product_name}, {$set :{product_name:product_image.name}}).then(()=>{res.json({message:"Image Updated"})})
})

router.get('/get/:_id',(req,res)=>{
    const id = req.params._id
    Product.find({_id:id}).then((sendId)=>{res.json(sendId)})
})

router.post('/update/:_id',(req,res)=>{
    const id = req.params._id;
    const {price ,description} = req.body;
    Product.updateOne({_id:id},{$set: {price, description}}).then(()=>{res.json({message:"Product Updated"})})
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