import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import ItemCard from "./ItemCard";
import axios from "axios";

function Home(){
    const [stateVar, setState] = useState({
        items: [],
        size: "",
        sort: "",
    });

    function getAll(){
        // Make a request for a user with a given ID
        axios.get("http://localhost:3001/items")
            .then(function (response) {
                setState(prevVal =>{
                    return{
                    items: response.data,
                    size: prevVal.size,
                    sort: prevVal.sort,
                    };
                });
            })
            .catch(function (error) {
                console.log(error);
            });   
    }

    useEffect(() => {
            getAll();  
    }, []);
    

    function filterProducts(event){
        console.log(event.target.value);
        let value = event.target.value;
        if(value === ""){
            getAll();
            setState(prevVal =>{
                return{
                    items: prevVal.items,
                    size: value,
                    sort: prevVal.sort,
                }
            });
        }else{
            axios.get("http://localhost:3001/items")
                .then(function (response) {
                    setState(prevVal =>{
                        return{
                        items: response.data,
                        size: prevVal.size,
                        sort: prevVal.sort,
                        };
                    });
                    setState(prevVal=>{
                        return{
                            size: value,
                            items: response.data.filter((item) =>{
                                return(
                                    item.attributes === value
                                );
                            }),
                            sort: prevVal.sort,
                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function sortProducts(event){
        let value = event.target.value;
        console.log(stateVar.sort);

        setState(prevVal=>{
            return{
                sort: value,
                size: prevVal.size,
                items: stateVar.items
                            .slice()
                                .sort((a,b) =>(
                                    value === "lowest"
                                        ? (a.price > b.price) 
                                            ? 1: -1
                                    :value === "highest"
                                        ? ((a.price < b.price) 
                                            ? 1:-1)
                                    :((a._id < b._id) 
                                            ? 1:-1)
                                ))
            }
        });
    }

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
        <div>
            <div className="content">
                <div className="filter-cards">
                    <Filter  
                        count={stateVar.items.length}
                        size={stateVar.size}
                        sort={stateVar.sort}
                        filterProducts={filterProducts}   
                        sortProducts={sortProducts}
                    />
                    <div className="cards">
                        {stateVar.items.map(CreateItem)}
                    </div>
                </div>
                <div className="sidebar">
                    Cart Items
                </div>
            </div>
        </div>
    );
}

export default Home;