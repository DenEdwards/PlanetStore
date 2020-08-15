import React from 'react';
//Import link that allows us to link to different routes
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        {/* Instead of anchor we use Link */}
            <Link to="/" className="navbar-brand"> <h1>PlanetStore</h1> </Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/add" className="nav-link">Add Item</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/admin" className="nav-link">Admin</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
