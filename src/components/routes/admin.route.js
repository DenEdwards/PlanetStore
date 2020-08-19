import React, {useState, useEffect} from "react";
import axios from "axios";
// NEED TO FIGURE OUT PROBLEM WITH TOTAL 
function Admin(){

    const [state, setState] = useState({
        orders:[]
    });

    function getOrders(){
        axios.get("http://localhost:3001/orders/")
            .then(function (response) {
                console.log(response.data);
                setState(() =>{
                    return{
                        orders: response.data
                    };
                });
            })
            .catch(function (error) {
                console.log(error);
            });   
    }

    useEffect(() => {
        getOrders();  
    },[]);
    
    return(
    <div>
        <h1 style={{marginLeft:"30px"}}>Admin</h1>
        {state.orders.map((order, index) =>{
            return(
                <div className="inventory" key={index}>
                <div>
                    <strong>Buyer Name: </strong>{order.name}
                </div>
                <div>
                    <strong>Buyer Email:</strong> {order.email}
                </div>
                <div>
                    <strong>Buyer Address:</strong> {order.address}
                </div>
                <div>
                    <strong>Total:</strong> ${order.total}
                </div>
                <div>
                    <strong>
                        Products: 
                    </strong>
                    <ul>
                        {order.cartItems.map((item,index) =>{
                            return(
                                <div key={index}>
                                    <li>
                                        <div>
                                            {item.name}
                                        </div>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                    <hr style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",width:"100%"}}></hr>
                </div>
                </div>
            );
        })}
    </div>
    );
}

export default Admin;