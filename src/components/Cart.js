import React from "react";

function Cart(props){

    const {cartItems} = props;
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
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total: ${cartItems.reduce((accumulator,currentItem) => accumulator + (currentItem.price*currentItem.count), 0)}
                            </div>
                            <button className="btn btn-success">Proceed to checkout</button>
                        </div>
                    </div>
                }
            </div>
        </div>
        
    );
}

export default Cart;