import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as SunIcon} from "../images/sun-solid.svg";
import {ReactComponent as InfoIcon} from "../images/circle-info-solid.svg";
import {ReactComponent as ChartIcon} from "../images/chart-line-solid.svg";
import InfoCard from "../components/home/InfoCard";

const Home = () => {
    const heroImage = {
        backgroundImage: `url(${require("../images/home/home-hero.jpg")})`
    }
    return (
        <div>
            {/*Hero div*/}
            <div className="h-60 flex flex-row">
                {/* lg:!bg-[url('')] tricks inline style into being blank*/}
                <div style={heroImage} className="lg:!bg-[url('')] bg-cover bg-center w-full lg:w-1/2 h-full">
                    <div className="bg-primary-blue/75 lg:bg-primary-blue w-full h-full text-white flex flex-col justify-center items-center">
                        <h1 className="text-3xl w-3/4 text-center">Need help with your allergies?</h1>
                        <Link to="/articles">
                            <div className="bg-primary-green w-fit p-2 pl-6 pr-6 mt-6 rounded-full">We Can Help</div>
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block absolute h-60 left-1/2">
                    <svg height="100%" width="100">
                        <polygon points="0,0 0,300 100,300" style={{fill: "#45a2ff"}} />
                    </svg>
                </div>
                {/*Hero image in background for scaling*/}
                <div style={heroImage} className="hidden lg:block h-full w-1/2 bg-cover bg-center" />
            </div>
            {/*Intro text*/}
            <div className="text-center mt-12 mb-12">
                <h1 className="text-5xl">Our Mission</h1>
                <p className="text-2xl w-3/4 m-auto mt-6">
                    Many people all around the world can be greatly affected by weather conditions such as those with
                    asthma and hay fever. We inform and assist those affected with the latest weather forecast and
                    information on environmental health conditions.
                </p>
            </div>
            {/*Misc info cards*/}
            <div className="flex flex-col lg:flex-row justify-around items-center">
                <InfoCard
                    icon={<SunIcon/>}
                    title="Forecasting"
                    body="Latest and relevant weather information for your local area."
                />
                <InfoCard
                    icon={<InfoIcon/>}
                    title="Information"
                    body="Articles containing essential information to help with seasonal allergies adn extreme weather
                    conditions."
                />
                <InfoCard
                    icon={<ChartIcon/>}
                    title="Health Tracking"
                    body="Track your health with our health tracking tool. Get a summary of your week."
                />
            </div>
        </div>
    );
};

export default Home;