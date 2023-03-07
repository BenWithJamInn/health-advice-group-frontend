import React from 'react';
import Card from "../Card";

const InfoCard = (props) => {
    return (
        <div className="m-6 lg:m-0">
            <Card>
                <div className="w-72 text-center flex flex-col items-center">
                    <div className="h-14 w-14">
                        {props.icon}
                    </div>
                    <h1 className="text-3xl mt-4 mb-4">{props.title}</h1>
                    <p className="text-xl">{props.body}</p>
                </div>
            </Card>
        </div>
    );
};

export default InfoCard;
