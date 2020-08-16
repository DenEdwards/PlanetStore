import React, {useState} from "react";

function Cart(props){

    const {cartItems} = props;
    const [state, setState] = useState({
        showCheckout: false,
        name: "",
        email: "",
        address: ""
    });

    function handleChange(event){
        const {name, value}= event.target;
        setState(prevVal=>{
            if(name === "name"){
                return{
                    showCheckout: prevVal.showCheckout,
                    name: value,
                    email: prevVal.email,
                    address: prevVal.address
                }
            }else if(name === "email"){
                return{
                    showCheckout: prevVal.showCheckout,
                    name: prevVal.name,
                    email: value,
                    address: prevVal.address
                }
            }else if(name === "address"){
                return{
                    showCheckout: prevVal.showCheckout,
                    name: prevVal.name,
                    email: prevVal.email,
                    address: value
                }
            }
        })
    }

    function createOrder(event){
        event.preventDefault();
        const order = {
            name: state.name,
            email: state.email,
            address: state.address,
            cartItems: cartItems
        };
        console.log(state);
        props.createOrder(order);
        
    }

    return(
        <div>
            {cartItems.length === 0 ? <div className="cart cart-header">Cart is empty</div>
                :
                cartItems.length > 1 ? <div className="cart cart-header">You have {cartItems.length} different Planets in your cart.</div>
                    : <div className="cart cart-header">You have {cartItems.length} Planet in your cart.</div>
            }
            <div>
                <div className="cart">
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
                                            ${(item.price)} x {item.count}{" "}
                                            <button className="btn btn-danger" onClick={() => props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {cartItems.length !== 0 && 
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total: ${cartItems.reduce((accumulator,currentItem) => accumulator + (currentItem.price*currentItem.count), 0)}
                                </div>
                                <button onClick={() => {
                                    setState(prevVal=>{
                                        return {
                                            showCheckout: true,
                                            name: prevVal.name,
                                            email: prevVal.email,
                                            address: prevVal.address
                                        }
                                    })
                                }} className="btn btn-success">Proceed to checkout
                                </button>
                            </div>
                        </div>
                        {state.showCheckout &&(
                            <div className="cart"> 
                                <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={handleChange}></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input name="name" type="text" required onChange={handleChange}></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input name="address" type="address" required onChange={handleChange}></input>
                                        </li>
                                        <li>
                                            <button className="button success" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
        
    );
}

export default Cart;