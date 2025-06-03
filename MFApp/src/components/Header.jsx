import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (    
        <>
            <div className="header">
                Microfrontend Host Application
            </div>            <ul className="nav">
                <li><NavLink to="/" className={({isActive}) =>
                    isActive ? "active" : "" }>Home</NavLink></li>
                
                <li><NavLink to="/vue-js" className={({isActive}) =>
                    isActive ? "active" : "" }>Vue App</NavLink></li>
                
                
                <li><NavLink to="/to-do-app" className={({isActive}) =>
                    isActive ? "active" : "" }>To Do List</NavLink></li>
            </ul>
        </>
    )
}

export default Header;
