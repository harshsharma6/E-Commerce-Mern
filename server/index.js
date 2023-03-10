const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: "./db/config.env" })
const conn = require('./db/conn');

const express = require('express')
const app = express()

app.use(express.json());
// link the router file to make router
app.use(require('./router/auth'));

// Enable folder to serve files from server
app.use(express.static('products'))
app.use(express.static('user_img'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: "100mb", extended: true}))

const port = process.env.PORT;

// middleware
const middleware = (req, res, next) => {
    console.log("middleware test............");
    next();
}

app.get('/', middleware,(req, res) => {
  res.send('Hello World!')
})

app.get('/signin', (req, res)=>{
  res.send(`Sign In page`);
});
app.get('/adminpage', (req, res)=>{
  res.send(`Admin page`);
});
app.get('/productpage', (req, res)=>{
  res.send(`Product Page`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})