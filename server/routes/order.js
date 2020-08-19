const router = require("express").Router();

let Order = require("../models/order.model");

// CRUD - Create, Read, Update, Delete
router.route("/add").post((req,res) => {
    const {email, name, address, total, cartItems} = req.body;
    if(!email ||
        !name ||
        !address ||
        !total||
        !cartItems){
            return res.send({message:"Data is required."});
        }

        const newOrder = new Order({
        email,
        name,
        address,
        total,
        cartItems
    });

    newOrder.save()
        .then((order) => res.json(order => res.json(order.name +"'s order was added.")))
        .catch((err) => res.status("400").json("Error: "+ err));

    });


router.route("/").get((req,res) =>{
    Order.find()
        .then((order) => res.json(order))
        .catch((err) => res.status("400").json("Error: " + err));
});


router.route("/update/:id").post((req,res) => {
    Order.findByIdAndUpdate(req.params.id)
        .then((order) =>{
            order.email = req.body.email;
            order.name = req.body.name;
            order.address = req.body.address;
            order.total = req.body.total;
            order.cartItems = req.body.cartItems;
            
            order.save()
                .then((order) => res.json(order.name + "'s order was updated."))
                .catch(err => res.status("400").json("Error: " + err));
        });
});

router.route("/delete/:id").delete((req,res) =>{
    Order.findByIdAndDelete(req.params.id)
        .then((order) => res.json("Order with id: " + order._id + " was deleted."))
        .catch((err) => res.status("400").json("Error: " + err));
});

module.exports = router;