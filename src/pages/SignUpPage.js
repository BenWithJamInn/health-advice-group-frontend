import React, {useEffect, useState} from 'react';
import PageBar from "../components/PageBar";
import {client} from "../App";
import {Link} from "react-router-dom";
import axios from "axios";

// https://stackoverflow.com/a/201378
const emailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"

const SignUpPage = () => {
    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [passwordConfirmVal, setPasswordConfirmVal] = useState("");

    function checkInputs() {
        // stars input checks
        const email = document.getElementById("email")
        const password = document.getElementById("password")
        const passwordConfirm = document.getElementById("password-confirm")

        const emailError = document.getElementById("email-error")
        const passwordError = document.getElementById("password-error")

        // email check
        if (!emailVal.match(emailRegex)) {
            if (emailVal !== "") {
                emailError.innerHTML = "Invalid Email!"
                email.classList.add("!border-red-600")
            }
            return false
        } else {
            emailError.innerHTML = ""
            email.classList.remove("!border-red-600")
        }

        // password check
        if (!passwordVal.match(passwordRegex)) {
            passwordError.innerHTML = "Password too simple, make sure to use numbers, capitals, symbols and at least 8 characters long."
            password.classList.add("!border-red-600")
            return false
        } else {
            passwordError.innerHTML = ""
            password.classList.remove("!border-red-600")
        }

        // password confirm check
        if (passwordVal !== passwordConfirmVal) {
            passwordError.innerHTML = "Password must match!"
            password.classList.add("!border-red-600")
            passwordConfirm.classList.add("!border-red-600")
            return false
        } else {
            passwordError.innerHTML = ""
            password.classList.remove("!border-red-600")
            passwordConfirm.classList.remove("!border-red-600")
        }
        return true
    }

    useEffect(() => {
        checkInputs()
    }, [emailVal, passwordVal, passwordConfirmVal])

    async function onSubmit(event) {
        event.preventDefault()
        const status = checkInputs()
        if (!status) {
            return
        }
        try {
            const res = await client.post("account/signup", {
                "username": emailVal,
                "password": passwordVal
            })
            console.log(res.data)
            window.localStorage.setItem("token", res.data.token)
            window.localStorage.setItem("user-id", res.data.id)
            window.localStorage.setItem("logged-in", "true")
            document.getElementById("status-text").classList.remove("hidden")
            document.getElementById("signup-form").classList.add("hidden")

            setTimeout(() => {
                window.location.href = "/"
            }, 1000)
        } catch (e) {
            document.getElementById("submit-error").innerHTML = e.response.data.message
        }
    }

    return (
        <div>
            <PageBar title="SIGN UP"/>
            <div className="w-[90%] lg:w-[80%] max-w-[40rem] m-auto mt-12 lg:mt-20 py-6 bg-white rounded-xl px-6 lg:px-12 drop-shadow-lg">
                <h1 id="status-text" className="text-5xl hidden">Signing Up...</h1>
                <form id="signup-form" onSubmit={onSubmit}>
                    <div className="my-3 lg:my-6">
                        <label className="text-xl">Email</label><br/>
                        <label className="text-red-600" id="email-error"></label>
                        <input className="border-solid border-[1px] border-black rounded-lg w-full h-10 text-lg p-2" value={emailVal} onChange={(event) => setEmailVal(event.target.value)} id="email" type="email"/><br/>
                    </div>
                    <div className="my-6">
                        <label className="text-xl">Password</label><br/>
                        <label className="text-red-600" id="password-error"></label>
                        <input className="border-solid border-[1px] border-black rounded-lg w-full h-10 text-lg p-2" value={passwordVal} onChange={(event) => setPasswordVal(event.target.value)} id="password" type="password"/><br/>
                    </div>
                    <div className="my-6">
                        <label className="text-xl">Confirm Password</label><br/>
                        <input className="border-solid border-[1px] border-black rounded-lg w-full h-10 text-lg p-2" value={passwordConfirmVal} onChange={(event) => setPasswordConfirmVal(event.target.value)} id="password-confirm" type="password"/>
                    </div>
                    <div className="flex flex-col items-center">
                        <label>
                            <p className="inline">Already have an account?  </p>
                            <p className="text-blue-600 underline inline">
                                <Link to="/signin">Sign In</Link>
                            </p>
                        </label>
                        <label className="text-red-600 mb-6" id="submit-error"></label>
                        <input className="bg-primary-blue text-white text-xl w-32 h-12 rounded-lg hover:cursor-pointer" id="sign-up-submit" type="submit" value="Sign Up"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;