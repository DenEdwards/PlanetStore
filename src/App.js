import React from 'react';
//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Import routes to route different urls to different components
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItem from "./components/routes/add-item.route.js";
import Admin from "./components/routes/admin.route.js";
import Home from "./components/Home.js";
import './styles.css';

function App() {

  var year = new Date().getFullYear();

  return (
    <div>
      <Router>
        <Navbar />
        <br/>
        {/* Create a Route for Each Part of the application */}
        <Route path="/" exact component={Home}/>
        <Route path="/add" exact component={AddItem}/>
        <Route path="/admin" exact component={Admin}/>
        <footer><p>Made by Denzel Edwards © {year}</p></footer>
      </Router>
    </div>
  );
}

export default App;
