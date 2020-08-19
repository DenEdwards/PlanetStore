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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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