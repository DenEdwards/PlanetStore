import React from 'react';
//Import link that allows us to link to different routes
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        {/* Instead of anchor we use Link */}
            <a><Link to="/" className="navbar-brand"> <h1>PlanetStore</h1> </Link></a> 
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <a><Link to="/add" className="nav-link">Add Item</Link></a> 
                    </li>
                    <li className="navbar-item">
                        <a><Link to="/admin" className="nav-link">Admin</Link></a> 
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
