import React from 'react';
//Import link that allows us to link to different routes
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        {/* Instead of anchor we use Link */}
            <Link to="/" className="navbar-brand"> <h1>PlanetStore</h1> </Link>
        </nav>
    );
}

export default Navbar;
