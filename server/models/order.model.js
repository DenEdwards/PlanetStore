const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email:String,
    name:String,
    address:String,
    total:Number,
    cartItems:[]
},{
    timestamps: true
}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;