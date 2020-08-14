import React, { useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";

function Home(){
    const [items, setItems] = useState([]);

    // Make a request for a user with a given ID
    axios.get("http://localhost:3001/items")
    .then(function (response) {
        setItems(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

    function CreateItem(item){
        return(
                <ItemCard
                key = {item._id}
                name = {item.name}
                description = {item.description}
                price = {item.price}
                image = {item.image}
                />
        );
    }

    return(
        <div className="home">
            {items.map(CreateItem)}
        </div>
    );
}

export default Home;