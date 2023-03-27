import React, {useEffect, useRef, useState} from 'react';
import PageBar from "../components/PageBar";
import DayCard from "../components/forecast/DayCard";
import SimpleGrid from "../components/SimpleGrid";
import Card from "../components/Card";
import {client} from "../App";
import moment from "moment";

const Forecast = () => {
    const [data, setData] = useState()
    const [selectedData, setSelectedData] = useState();
    const address = useRef(null)

    // Async function to make sure the promise is resolved before setting new state
    async function getData(queryAddress) {
        const response = await client.get("forecast/hourly", {
            params: {
                location: queryAddress
            }
        })
        // if no location returns then no location was found
        if (!response.data.location) {
            return
        }
        address.current = (response.data.location.name + " " + response.data.location.region)
        setData(response.data)
    }

    function submitAddress(event) {
        event.preventDefault()
        getData(document.getElementById("forecast-address").value)
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((geoEvent) => {
                getData(geoEvent.coords.latitude + "," + geoEvent.coords.longitude)
            })
        }
    }, [])

    useEffect(() => {
        console.log("selecting data")
        if (data && !data.error) {
            setSelectedData(data.forecast.forecastday[0])
            console.log("selected data")
            console.log(data.forecast.forecastday[0])
        }
    }, [data])

    let content

    if (!data || !selectedData || data.error) {
        content = (
            <div>
                <h1 className="text-xl text-center max-w-[30rem] mx-auto mt-6">Please enter you address into the search bar or accept location permissions in your browser.</h1>
            </div>
        )
    } else {
        content = (
            <div>
                {/*Current address selected*/}
                {address.current ? <h1 className="text-xl text-center max-w-[30rem] mt-6 mx-auto">Showing forecast for: {address.current}</h1> : null}
                {/*Day selector / preview*/}
                <div className="mt-3 w-full flex flex-row justify-start lg:justify-center overflow-x-auto">
                    {data.forecast.forecastday.map(day => {
                        return (<div className="ml-4 mr-4 mt-6">
                            <DayCard
                                data={day}
                                setSelected={setSelectedData}
                            />
                        </div>)
                    })}
                </div>
                {/*Hourly forecast*/}
                <div className="mt-6 p-4 flex flex-col lg:flex-row justify-around just">
                    <div className="mt-8 sticky top-[6rem] z-10">
                        <Card classNames="!w-full border-solid border-[1px] border-black">
                            <SimpleGrid classNames="!justify-around text-sm lg:text-base">
                                <p className="w-full">Temp(c)</p>
                                <p className="w-full">Humidity</p>
                                <p className="w-full">UV</p>
                                <p className="w-full">Windchill(c)</p>
                                <p className="w-full">Chance of Rain</p>
                            </SimpleGrid>
                        </Card>
                    </div>
                    <div className="pb-6 ml-4 flex flex-col lg:flex-row lg:overflow-x-scroll">
                        {
                            selectedData.hour.map(hourly => {
                                return (
                                    <div className="lg:mr-4 lg:ml-4 flex items-center flex-col" key={Math.random()}>
                                        {
                                            (() => {
                                                const time = moment(hourly.time)
                                                return (
                                                    <div className="flex flex-row">
                                                        <p className="h-8 text-xl font-bold">{time.format("kk")}</p>
                                                        <p className="h-8 text-xl">{time.format(":mm")}</p>
                                                    </div>
                                                )
                                            })()
                                        }
                                        <Card classNames="!w-full border-solid border-[1px] border-black">
                                            <SimpleGrid classNames="!justify-around">
                                                <p className="w-[15%] lg:w-auto">{hourly.temp_c}c</p>
                                                <p className="w-[15%] lg:w-auto">{hourly.humidity}%</p>
                                                <p className="w-[15%] lg:w-auto">{hourly.uv}</p>
                                                <p className="w-[15%] lg:w-auto">{hourly.windchill_c}c</p>
                                                <p className="w-[15%] lg:w-auto">{hourly.chance_of_rain}%</p>
                                            </SimpleGrid>
                                        </Card>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <PageBar title="FORECAST">
                <div className="w-full pr-4 lg:pr-0 flex justify-end lg:justify-center">
                    <form onSubmit={submitAddress} className="w-1/2 h-8 flex justify-center text-black">
                        <input id="forecast-address" type="text" title="Address" placeholder="Address" className="w-full p-1 rounded"/>
                    </form>
                </div>
            </PageBar>
            {content}
        </div>
    );
};

export default Forecast;