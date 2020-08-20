import React, {useState} from "react";
import axios from "axios";

function AddItem(){

    const [foodItem, setFoodItem] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        attributes: ""
    });

    function handleChange(event){
        let { name, value } = event.target;

        setFoodItem(prevItem => {
        if (name === "name") {
            return {
                name: value,
                description: prevItem.description,
                price: prevItem.price,
                image: prevItem.image,
                attributes: prevItem.attributes,
            };
        }else if(name ==="description"){
            return {
                name: prevItem.name,
                description: value,
                price: prevItem.price,
                image: prevItem.image,
                attributes: prevItem.attributes,
            };
        }else if(name ==="price"){
            return {
                name: prevItem.name,
                description: prevItem.description,
                price: value,
                image: prevItem.image,
                attributes: prevItem.attributes,
            };
        }else if(name ==="image"){
            return {
                name: prevItem.name,
                description: prevItem.description,
                price: prevItem.price,
                image: value,
                attributes: prevItem.attributes,
            };
        }else if(name ==="attributes"){
            return {
                name: prevItem.name,
                description: prevItem.description,
                price: prevItem.price,
                image: prevItem.image,
                attributes:value ,
            };
        }
        });
    }

    function onSubmit(event){
        const food = {
            name: foodItem.name,
            description: foodItem.description,
            price: foodItem.price,
            image: foodItem.image,
            attributes: foodItem.attributes,
        }

        console.log(food);

        axios.post("https://planet-store.herokuapp.com/items/add", food)
            .then(res => console.log(res.data));
    }

    return(
    <div className="container">
        <h1>Add Items</h1>
        <form>
            <ul className="add-ul">
                <li>
                    <label>Name:{" "}</label>
                    <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={foodItem.name}
                    />
                </li>
                <li>
                    <label>Description:{" "}</label>
                    <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={foodItem.description}
                    />
                </li>
                <li>
                    <label>Price:{" "}</label>
                    <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={foodItem.price}
                    />
                </li>
                <li>
                    <label>Image:{" "}</label>
                    <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Image"
                    name="image"
                    value={foodItem.image}
                    />
                </li>
                <li>
                    <label>Attributes:{" "}</label>
                    <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Attributes"
                    name="attributes"
                    value={foodItem.attributes}
                    />
                </li>
                <li>
                    <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                </li>
            </ul>
        </form>
    </div>
    );
}

export default AddItem;