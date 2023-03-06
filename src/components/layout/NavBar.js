import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    const navBarLinks = [
        <Link to="/forecast">FORECAST</Link>,
        <Link to="/articles">ARTICLES</Link>,
        <Link to="/tracker">HEALTH TRACKER</Link>,
        <Link to="/about-us">ABOUT US</Link>
    ]
    return (
        <div className="bg-white w-full h-20 text-lg flex items-center">
            <Link to="/">
                <img className="h-12 ml-5 mr-10" src={require("../../images/Logo_Filled.png")} alt="Health Advice Group Logo"/>
            </Link>
            {/*Navbar links desktop*/}
            <div className="hidden md:flex flex-row space-x-10">
                {navBarLinks}
            </div>
        </div>
    );
};

export default NavBar;