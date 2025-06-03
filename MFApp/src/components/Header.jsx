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

                <li><NavLink to="/cart-app" className={({isActive}) =>
                    isActive ? "active" : "" }>Cart App</NavLink></li>


                <li><NavLink to="/checkout" className={({isActive}) =>
                    isActive ? "active" : "" }>Checkout</NavLink></li>
            </ul>
        </>
    )
}

export default Header;
