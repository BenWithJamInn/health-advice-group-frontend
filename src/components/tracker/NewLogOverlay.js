import Card from "../Card";
import {Slider} from "@mui/joy";
import React, {useEffect, useRef, useState} from "react";
import {client} from "../../App";

function NewLogOverlay(props) {
    const sliderVal = useRef()
    let coolDown = Date.now()

    useEffect(() => {
        document.getElementById("new-log-form").addEventListener("submit", event => {
            event.preventDefault()
            // check if it has been at least a second since last request (prevents double sending request)
            if (Date.now() - coolDown < 1000) {
                return
            }
            coolDown = Date.now()
            const notes = document.getElementById("notes")
            client.post("/healthlog/new", {
                healthScore: sliderVal.current,
                notes: notes.value
            })
            props.setVisible(false)
            props.getLogs()
        })
    }, [])

    return (
        <div className="w-[92%] max-w-[30rem] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            <Card classNames="w-full h-full border-[1px] border-gray-300">
                <h1 className="text-center text-3xl">New Health Log</h1>
                <form id="new-log-form" className="mt-4">
                    <label className="text-xl">How are you feeling today?</label>
                    <div className="mt-4"/>
                    <Slider
                        id="health-slider"
                        color="neutral"
                        marks
                        valueLabelDisplay="on"
                        max={10}
                        min={1}
                        defaultValue={5}
                        onChange={event => sliderVal.current = event.target.value}
                    />
                    <label className="text-xl">Notes about your health</label>
                    <textarea className="w-full resize-none border-[1px] border-black rounded h-32 p-2" id="notes"/>
                    <div className="flex justify-center mt-4">
                        <input className="bg-primary-blue text-white text-xl w-32 h-12 rounded-lg hover:cursor-pointer"
                               type="submit"/>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default NewLogOverlay
