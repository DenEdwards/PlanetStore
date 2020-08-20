import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import axios from "axios";
import store from "../store";
import { Provider } from "react-redux";

function Home(){
    const [stateVar, setState] = useState({
        items: [],
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        size: "",
        sort: "",
    });
    function getAll(){ 
        // Make a request for a user with a given ID
        axios.get("http://localhost:3001/")
            .then(function (response) {
                setState(prevVal =>{
                    return{
                    items: response.data,
                    cartItems: prevVal.cartItems,
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
    

    function createOrder(order){
        console.log("Order: ");
        console.log(order);

        axios.post("http://localhost:3001/orders/add", order)
            .then(res => console.log(res.data));
    }

    function addToCart(item){
        console.log("added " + item.id);
        const tempCartItems = stateVar.cartItems.slice();
        let alreadyInCart = false;
        tempCartItems.forEach(product =>{
            if(product.id === item.id){
                product.count++;
                alreadyInCart = true;
                console.log("in: "+ product.count);
            }
        }) 
        if(!alreadyInCart){
            tempCartItems.push({...item, count: 1});
            console.log(tempCartItems);
        }
        setState(prevVal=>{
            console.log(tempCartItems);
            return{
                items: prevVal.items,
                cartItems: tempCartItems,
                size: prevVal.size,
                sort: prevVal.sort
            }
        })
        localStorage.setItem("cartItems",JSON.stringify(tempCartItems));
    }

    function removeFromCart(item){
        const tempCartItems = stateVar.cartItems.slice();
        setState(prevVal=>{
            console.log(tempCartItems);
            return{
                items: prevVal.items,
                cartItems: tempCartItems.filter((x) =>{
                    return x.id !== item.id
                }),
                size: prevVal.size,
                sort: prevVal.sort
            }
        })
        localStorage.setItem("cartItems",JSON.stringify(tempCartItems.filter((x) =>{
            return x.id !== item.id
        })));
    }

    function filterProducts(event){
        console.log(event.target.value);
        let value = event.target.value;
        if(value === ""){
            getAll();
            setState(prevVal =>{
                return{
                    items: prevVal.items,
                    cartItems: prevVal.cartItems,
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
                        cartItems: prevVal.cartItems,
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
                            cartItems: prevVal.cartItems,
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
                cartItems: prevVal.cartItems,
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
                id ={item._id}
                name = {item.name}
                description = {item.description}
                price = {item.price}
                image = {item.image}
                addToCart={addToCart}
                />
        );
    }

    return(
        <Provider store={store}>
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
                    {
                        !stateVar.items ? (<div>Loading...</div>):
                        stateVar.items.map(CreateItem)
                    } 
                    </div>
                </div>
                <div className="sidebar">
                    <Cart cartItems={stateVar.cartItems} removeFromCart={removeFromCart} createOrder={createOrder}/>
                </div>
            </div>
        </div>
        </Provider>
    );
}

export default Home;