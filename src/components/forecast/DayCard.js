import React from 'react';
import moment from "moment";

const DayCard = (props) => {
    function onClick() {
        props.setSelected(props.data)
    }
    return (
        <div onClick={onClick} className="w-40 lg:w-60 h-72 lg:h-52 p-6 bg-primary-blue drop-shadow-lg rounded-3xl text-white flex flex-col items-center justify-between hover:cursor-pointer">
            <h1 className="text-3xl">{moment(props.data.date).format("ddd Do")}</h1>
            <div className="flex flex-col items-center lg:flex-row">
                <div className="h-20 lg:h-full">
                    <img src={props.data.day.condition.icon} alt={"Weather icon " + props.data.day.condition.text}/>
                </div>
                <p className="text-xl text-center lg:w-3/4">{props.data.day.condition.text}</p>
            </div>
            <p className="text-2xl">{props.data.day.avgtemp_c}c</p>
        </div>
    );
};

export default DayCard;