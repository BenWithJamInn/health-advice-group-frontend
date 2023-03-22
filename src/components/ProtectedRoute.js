import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Checks to see if the client is logged in, if not then redirect to sign in page
 */
const ProtectedRoute = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (window.localStorage.getItem("logged-in") !== "true") {
            navigate("/signin")
        }
    })

    return (
        <>
            {props.children}
        </>
    );
};

export default ProtectedRoute;