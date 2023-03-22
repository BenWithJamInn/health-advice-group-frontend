import React, {useEffect, useRef, useState} from 'react';
import PageBar from "../components/PageBar";
import HealthLog from "../components/tracker/HealthLog";
import NewLogOverlay from "../components/tracker/NewLogOverlay";
import {client} from "../App";
import {ReactComponent as PenToSquare} from "../images/pen-to-square-regular.svg";
import moment from "moment";

const HealthTrackingPage = () => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [logs, setLogs] = useState([])
    const overlay = useRef()
    const newButton = useRef()

    async function getLogs() {
        const response = await client.get("/healthlog/")
        setLogs(response.data)
    }

    useEffect(() => {
        getLogs()
        window.addEventListener("mousedown", event => {
            if (!overlay.current) {
                return
            }
            if (!overlay.current.contains(event.target) &&
                !newButton.current.contains(event.target)) {
                setOverlayVisible(false)
            }
        })
    }, [])

    let averageScore = 0;
    let totalScore = 0;
    let worstDay = null;
    for (let log of logs) {
        totalScore += log.healthScore
        if (worstDay == null || worstDay.healthScore > log.healthScore) {
            worstDay = log
        }
    }
    averageScore = totalScore / logs.length

    console.log(worstDay)

    return (
        <div>
            <PageBar title="HEALTH TRACKER"/>
            <div className="bg-white p-10">
                <h1 className="text-2xl mb-6">Your Health Summary</h1>
                <div className="flex flex-row space-x-6 text-xl">
                    <div>
                        <p>Average Score: </p>
                        <p>Total Score: </p>
                        {worstDay ? <p>Worst Day: </p> : null}
                    </div>
                    <div>
                        <p>{averageScore}</p>
                        <p>{totalScore}</p>
                        {worstDay ? <p>{moment(worstDay.date).format("DD/MM/YY")}</p> : null}
                    </div>
                </div>
            </div>
            <div className="space-y-6 pt-6 w-[90%] mx-auto">
                <div className="flex justify-end">
                    <button ref={newButton} className="bg-primary-blue text-white text-xl w-28 h-12 rounded-lg hover:cursor-pointer px-2" onClick={() => setOverlayVisible(true)}>
                        <div className="w-full h-full flex flex-row justify-around items-center">
                            <div className="h-7 w-7">
                                <PenToSquare/>
                            </div>
                            <p>NEW</p>
                        </div>
                    </button>
                </div>
                {
                    logs.map(k => <HealthLog key={k.id} date={k.date} health={k.healthScore} notes={k.notes}/>)
                }
            </div>
            <div ref={overlay} className={"transition-[opacity]" + (overlayVisible ? "" : " opacity-0")}>
                <NewLogOverlay setVisible={setOverlayVisible} getLogs={getLogs}/>
            </div>
        </div>
    );
};

export default HealthTrackingPage;