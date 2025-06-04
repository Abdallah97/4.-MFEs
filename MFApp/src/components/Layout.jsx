import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default layout;