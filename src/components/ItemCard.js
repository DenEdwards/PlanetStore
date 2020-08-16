import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

function ItemCard(props){
    return(
        <div>
            <div className="card">
                <div>
                    <a onClick={() => {alert(props.description)}} className="card-icon" ><FontAwesomeIcon icon={faQuestionCircle} /></a> 
                </div>
                    <img className="card-img" src={props.image} alt={props.name}></img>
                <div >
                <a onClick={() => props.addToCart(props)} className="plus-icon"><FontAwesomeIcon  icon={faCartPlus} /></a> 
                </div>
                <ul>
                    <li>
                        <h3 >{props.name}</h3>
                    </li>
                    <li>
                        <h1>${props.price}</h1>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ItemCard;