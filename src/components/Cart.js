import React, {useState} from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

function Cart(props){

    const {cartItems} = props;
    const [state, setState] = useState({
        showCheckout: false,
        name: "",
        email: "",
        address: "",
        order: null
    });

    function handleChange(event){
        const {name, value}= event.target;
        setState(prevVal=>{
            if(name === "name"){
                return{
                    showCheckout: prevVal.showCheckout,
                    name: value,
                    email: prevVal.email,
                    address: prevVal.address,
                    order: prevVal.order
                }
            }else if(name === "email"){
                return{
                    showCheckout: prevVal.showCheckout,
                    name: prevVal.name,
                    email: value,
                    address: prevVal.address,
                    order: prevVal.order
                }
            }else if(name === "address"){
                return{
                    showCheckout: prevVal.showCheckout,
                    name: prevVal.name,
                    email: prevVal.email,
                    address: value,
                    order: prevVal.order
                }
            }
        })
    }

    function createOrder(event){
        event.preventDefault();
        setState(prevVal=>{
            return{
                showCheckout: prevVal.showCheckout,
                name: prevVal.name,
                email: prevVal.email,
                address: prevVal.address,
                order: {
                    email: state.email,
                    name: state.name,
                    address: state.address,
                    total: props.cartItems.reduce((accumulator, currentItem) => (accumulator + currentItem.price*currentItem.count),0).toFixed(2),
                    cartItems: cartItems,
                }
            }
        });
        props.createOrder(state.order);
        setState(prevVal=>{
            return{
                showCheckout: !prevVal.showCheckout,
                name: "",
                email:"",
                address: "",
                order: prevVal.order
            }
        });
    }

    function openModal(){
        setState(prevVal=>{
            return{
                showCheckout: prevVal.showCheckout,
                name: prevVal.name,
                email: prevVal.email,
                address: prevVal.address,
                order: {
                    email: state.email,
                    name: state.name,
                    address: state.address,
                    total: props.cartItems.reduce((accumulator, currentItem) => (accumulator + currentItem.price*currentItem.count),0).toFixed(2),
                    cartItems: cartItems,
                }
            }
        });
    }

    function closeModal(){
        setState(prevVal=>{
            return{
                showCheckout: prevVal.showCheckout,
                name: prevVal.name,
                email: prevVal.email,
                address: prevVal.address,
                order: null
            }
        });
    }

    return(
        <div>
            {cartItems.length === 0 ? <div className="cart cart-header">Cart is empty</div>
                :
                cartItems.length > 1 ? <div className="cart cart-header">You have {cartItems.length} different Planets in your cart.</div>
                    : <div className="cart cart-header">You have {cartItems.length} Planet in your cart.</div>
            }
            {
                state.order && 
                <Modal  className="Modal" ariaHideApp={false} isOpen={true} onRequestClose={closeModal}>
                    <div className="checkout-modal">
                    <Zoom>
                        <button className=" close-modal btn btn-danger" onClick={closeModal}>x</button>
                        <div className="order-details">
                            <h1 className="success-message">Your order has been placed.</h1>
                            <h2>Order: </h2>
                            <ul>
                                <div className="order-list">
                                <li>
                                    <div>
                                        <h2>Name:</h2> 
                                    </div>
                                    <div>
                                        <h3>{state.order.name}</h3> 
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h2>Email:</h2> 
                                    </div>
                                    <div>
                                        <h3>{state.order.email}</h3> 
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h2>Address:</h2> 
                                    </div>
                                    <div>
                                        <h3>{state.order.address}</h3> 
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h2>Total:</h2> 
                                    </div>
                                    <div>
                                        <h3>${state.order.total}</h3> 
                                    </div>
                                </li>
                                <li className="cart-items">
                                    <div>
                                        <h2>Cart Items:</h2> 
                                    </div>
                                    <div>
                                            <h3 className="checkout-items">{state.order.cartItems.map((x,index)=>(
                                                <div key={index} >
                                                    {" "}{x.count}{" x "}{x.name}{", "}
                                                </div>
                                            ))}</h3> 
                                    </div>
                                </li>
                                </div>
                            </ul>
                        </div>
                    </Zoom>
                    </div>
                </Modal>
            }
            <div>
                <div className="cart">
                <Fade left cascade={true}>
                    <ul className="cart-items">
                        {cartItems.map((item) =>{
                            return(
                                <li key={item.id}>
                                    <div>
                                        <img src={item.image} alt={item.name}></img>
                                    </div>
                                    <div>
                                        <div>{item.name}</div>
                                        <div className="right">
                                            ${(item.price).toFixed(2)} x {item.count}{" "}
                                            <button className="btn btn-danger" onClick={() => props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    </Fade>

                </div>
                {cartItems.length !== 0 && 
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total: ${(cartItems.reduce((accumulator,currentItem) => accumulator + (currentItem.price*currentItem.count), 0)).toFixed(2)}
                                </div>
                                <button onClick={() => {
                                    setState(prevVal=>{
                                        return {
                                            showCheckout: true,
                                            name: prevVal.name,
                                            email: prevVal.email,
                                            address: prevVal.address,
                                            order: prevVal.order
                                        }
                                    })
                                }} className="btn btn-success">Proceed to checkout
                                </button>
                            </div>
                        </div>
                        {state.showCheckout &&(
                            <Fade right cascade={true}>
                            <div className="cart"> 
                                <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email"  onChange={handleChange} required></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input name="name" type="text"  onChange={handleChange} required></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input name="address" type="address"  onChange={handleChange} required></input>
                                        </li>
                                        <li>
                                            <button onClick={() => {
                                                if(state.name || state.email || state.address !== ""){
                                                    openModal(state.order);
                                                }else{
                                                    closeModal();
                                                }
                                            }} className="btn btn-success" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            </Fade>
                        )}
                    </div>
                }
            </div>
        </div>
        
    );
}

export default Cart;