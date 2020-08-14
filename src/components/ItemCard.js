import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function ItemCard(props){

    return(
        <div>
            <div className="card">
                <div>
                    <a onClick={() => {alert(props.description)}} className="card-icon" ><FontAwesomeIcon icon={faQuestionCircle} /></a> 
                </div>
                <div className="img-add">
                    <img className="card-img" src={props.image} alt={props.name}></img>
                </div>
                <div >
                    <a className="plus-icon"><FontAwesomeIcon  icon={faPlusCircle} /></a> 
                </div>
                <div className="name-container">
                    <h3 >{props.name}</h3>
                    <h1>{props.price}</h1>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;