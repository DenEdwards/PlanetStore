import React from "react";

function Filter(props){
    return(
        <div className="filter">
            <div className="filter-result">
                {props.count} Planets
            </div>
            <div className="filter-sort">
                Order{" "}
                <select value={props.sort} onChange={props.sortProducts}>
                    <option value="">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-size">
                Filter{" "}
                <select value={props.size} onChange={props.filterProducts}>
                    <option value="">ALL</option>
                    <option value="Resource">Resource</option>
                    <option value="Terrestrial">Terrestrial</option>
                    <option value="Uninhabitable">Uninhabitable</option>
                </select>
            </div>
        </div>   
    );
}

export default Filter;