import React from 'react';
import NavBar from "./components/layout/NavBar";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="h-full">
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default Layout;