import React, { useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";

function Home(){
    const [stateVar, setState] = useState({
        items: [],
        size: "",
        sort: ""
    });

    // Make a request for a user with a given ID
    axios.get("http://localhost:3001/items")
    .then(function (response) {
        setState(prevVal =>{
            return{
            items: response.data,
            size: prevVal.size,
            sort: prevVal.sort
            };
        });
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
        <div className="content">
            <div className="home">
                {stateVar.items.map(CreateItem)}
            </div>
            <div className="sidebar">
                Cart Items
            </div>
        </div>
        
    );
}

export default Home;