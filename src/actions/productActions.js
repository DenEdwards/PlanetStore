import { FETCH_PRODUCTS } from "../types";
import axios from "axios";

export const fetchProducts = () => async(dispatch) =>{
    return axios.get("https://planet-store.herokuapp.com/items")
        .then(({data}) =>{
            dispatch({
                type: FETCH_PRODUCTS,
                payload: data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}