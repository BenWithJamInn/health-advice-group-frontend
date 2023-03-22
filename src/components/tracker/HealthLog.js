import React from 'react';
import Card from "../Card";
import moment from "moment";

const HealthLog = (props) => {

    const date = moment(props.date)

    return (
        <>
            <Card classNames="w-full">
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                    {/*Current Date*/}
                    <div className="text-xl text-center">
                        <p>{date.format("MMMM Do")}</p>
                        <p>{date.format("hh:mm A")}</p>
                    </div>
                    {/*Health Rating*/}
                    <div className="text-2xl">
                        <p className="inline">{props.health}</p>
                        <p className="inline text-gray-500">/</p>
                        <p className="inline">10</p>
                    </div>
                    {/*User made notes*/}
                    <div className="lg:max-w-[30%] text-center">
                        <p>
                            {props.notes}
                        </p>
                    </div>
                    {/*Weather summary*/}
                    {/*<div>*/}
                    {/*    <p>*/}
                    {/*        temp: 6c    index: 6    uv: 1*/}
                    {/*    </p>*/}
                    {/*    <p>*/}
                    {/*        temp: 6c    index: 6    uv: 1*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </Card>
        </>
    );
};

export default HealthLog;