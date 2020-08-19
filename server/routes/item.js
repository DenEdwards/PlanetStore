//Using the express router
const router = require("express").Router();

//Getting the item model
let Item = require("../models/item.model");

//CRUD - Create, Read, Update and Delete 
//The home endpoint that handles the /items path
router.route("/").get((req, res) => {
    
    //Get all users from db
    Item.find()
        //Return all users in JSON format
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));       
})

//Posting to the /items/add route
router.route("/add").post((req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const attributes = req.body.attributes;

    const newItem = new Item({
        name,
        description,
        price,
        image,
        attributes
    });

    //Save the item to the db
    newItem.save()
        .then((item) => res.json(item.name + " Added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//Find the item by it's id
router.route("/:id").get((req,res) => {
    Item.findById(req.params.id)
        .then((item) => res.json(item))
        .catch((err) => res.status(400).json("Error: " + err));
});

//Delete the item by the id
router.route("/:id").delete((req,res) => {
    Item.findByIdAndDelete(req.params.id)
        .then((item) => res.json(item.name + " was deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//update item by the id
router.route("/update/:id").post((req,res) => {
    Item.findByIdAndUpdate(req.params.id)
        .then((item) => {
            item.name = req.body.name,
            item.description = req.body.description,
            item.price = req.body.price,
            item.image = req.body.image,
            item.attributes = req.body.attributes

            item.save()
                .then((updatedItem) => res.json(updatedItem.name + " was updated!"))
                .catch((err) => res.status(400).json("Error: "+err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});


//Export the router
module.exports = router;