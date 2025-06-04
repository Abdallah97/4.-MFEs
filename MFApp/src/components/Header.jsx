import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (    
        <header className="header">
            <h1>Microfrontend Host Application</h1>
            <nav>
                <ul className="nav">
                    <li><NavLink to="/" className={({isActive}) =>
                        isActive ? "active" : "" }>Home</NavLink></li>

                    <li><NavLink to="/cart-app" className={({isActive}) =>
                        isActive ? "active" : "" }>Cart App</NavLink></li>

                    <li><NavLink to="/checkout" className={({isActive}) =>
                        isActive ? "active" : "" }>Checkout</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
