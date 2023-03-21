import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as BarsSolid} from "../../images/BarsSolid.svg"

const NavBar = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const burgerButton = useRef();
    const sideBarRef = useRef();

    function signOut() {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user-id")
        window.localStorage.removeItem("logged-in")
        setSideBarOpen(false)
        window.location.reload()
    }

    const navBarLinks = [
        <Link onClick={() => setSideBarOpen(false)} to="/forecast">FORECAST</Link>,
        <Link onClick={() => setSideBarOpen(false)} to="/articles">ARTICLES</Link>,
        <Link onClick={() => setSideBarOpen(false)} to="/tracker">HEALTH TRACKER</Link>,
        <Link onClick={() => setSideBarOpen(false)} to="/about-us">ABOUT US</Link>
    ]

    const loggedOutLinks = [
        <Link onClick={() => setSideBarOpen(false)} to="signup">SIGN UP</Link>,
        <Link onClick={() => setSideBarOpen(false)} to="signin">SIGN IN</Link>
    ]

    const loggedInLinks = [
        <Link onClick={signOut} to="/">SIGN OUT</Link>
    ]

    function getEndLinks() {
        if (window.localStorage.getItem("logged-in") === "true") {
            return loggedInLinks
        }
        return loggedOutLinks
    }

    document.addEventListener("mousedown", event => {
        if (!sideBarRef.current) {
            return
        }
        if (!sideBarRef.current.contains(event.target) &&
            !burgerButton.current.contains(event.target)) {
            setSideBarOpen(false)
        }
    })

    function onBarClick() {
        setSideBarOpen(prev => {
            return !prev
        })
    }

    return (
        <div className="bg-white w-full h-20 text-lg flex items-center">
            <Link to="/">
                <img className="h-12 ml-5 mr-10" src={require("../../images/Logo_Filled.png")} alt="Health Advice Group Logo"/>
            </Link>
            {/*Navbar links desktop*/}
            <div className="flex justify-between w-full pr-12">
                <div className="hidden lg:flex flex-row space-x-10">
                    {navBarLinks}
                </div>
                <div className="hidden lg:flex flex-row space-x-10">
                    {getEndLinks()}
                </div>
            </div>
            <div ref={burgerButton} onClick={onBarClick} className="lg:hidden h-12 w-12 ml-auto mr-5 hover:cursor-pointer">
                <BarsSolid/>
            </div>
            <div ref={sideBarRef} className={("fixed h-full w-72 z-50 bg-white right-0 top-20 transition-transform " + (sideBarOpen ? "translate-x-0" : "translate-x-72"))}>
                <div className="flex flex-col items-center space-y-10 pt-10 text-2xl">
                    {navBarLinks}
                    <div className="h-[1px] w-[70%] bg-gray-700"/>
                    {getEndLinks()}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
