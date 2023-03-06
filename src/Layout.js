import React from 'react';
import NavBar from "./components/layout/NavBar";
import {Outlet} from "react-router-dom";
import Footer from "./components/layout/Footer";

const Layout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default Layout;