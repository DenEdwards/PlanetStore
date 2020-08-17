import React, {useState} from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

function ItemCard(props){
    const [state, setState] = useState({
        product: null,
    })

    function openModal(item){
        setState(prevVal=>{
            return{
                product: item
            }
        });
    }

    function closeModal(){
        setState(prevVal=>{
            return{
                product: null
            }
        });
    }

    return(
        <div>
            <div className="card">
            <Fade bottom cascade={true}>
                    <a href={"#"+props.id} onClick={() => openModal(props)}>
                        <img className="card-img" src={props.image} alt={props.name}></img>
                    </a>
                    <ul>
                        <li>
                            <h3 >{props.name}</h3>
                        </li>
                        <li>
                            <h1>${(props.price).toFixed(2)}</h1>
                        </li>
                    </ul>
                    <button  onClick={() => props.addToCart(props)} className=" btn plus-icon"><h3>Add to Cart</h3></button>

            </Fade>
            {
                state.product &&(
                    <Modal ariaHideApp={false} isOpen={true} onRequestClose={closeModal}>
                        <Zoom>
                            
                            <div className="modal-window">
                                <img src={props.image} alt={props.name}></img>
                                <div className="product-info">
                                    <div className="product-details">
                                        <h1>{props.name}</h1>
                                        <p>{props.description}</p>
                                        <div className="product-price">
                                            <h2>${(props.price).toFixed(2)}</h2>
                                        </div>
                                    <div className="modal-buttons">
                                        <button className="btn btn-success" onClick={() =>{
                                            props.addToCart(props); 
                                            closeModal();
                                        }}>Add To Cart</button>
                                        <button className="btn btn-dark" onClick={closeModal}>Back to shopping</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )
            }
            </div>
        </div>
    );
}

export default ItemCard;