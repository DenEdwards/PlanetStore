//Requiring all the node modules installed
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//models
const itemRouter = require("./routes/item");
const orderRouter = require("./routes/order");

//Express web framework that lets you structure the store to handle multiple different http requests at a specific url.
app = express();
//Let the port be 3000 or whatever port the host provides
const port = process.env.PORT || 3001;

//cors enables scripts running on a browser client to interact with resources from a different origin
app.use(cors());
//allows server to parse objects as json objects
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    // Pass to next layer of middleware
    next();
 });

//connect to mongodb atlas with our .env variable
mongoose.connect(process.env.MONGODB_ATLAS, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
//Once connection's opened log it
mongoose.connection.once("open", () => {
    console.log("Connection to MongoDB Atlas successful!");
});

app.get("/", function(req,res){
    res.send("Hello World");    
});

//Using the route for the item
app.use("/items", itemRouter);
app.use("/orders", orderRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});