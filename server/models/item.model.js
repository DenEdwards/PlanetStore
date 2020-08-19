const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    //name of the item
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    attributes:{
        type: String
    }
});

//Create an item model from the item schema
const Item = mongoose.model("Item", itemSchema);

//Export the Item
module.exports = Item;