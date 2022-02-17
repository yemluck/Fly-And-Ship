import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPageShipper.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPageShipper() {
    const [heading, setHeading] = useState('Welcome');
    const history = useHistory();
    const type = 'shipper'

    const onLogin = (event) => {
        history.push('/login');
    };

    return (
        <div className="container">
            <h2>{heading}</h2>

            <div className="grid">
                <div className="grid-col grid-col_8">
                    <h4> The busiest international flight route is?</h4>
                    <p>
                        If your guess is New York - London, you are far from the truth, the
                        record holders do not travel to Europe or the USA.
                        In fact, the busiest international route is Hong-Kong - Taipei,
                        Taiwan: 6.5 million passengers travelled between the two
                        Asian destinations in 2018 on almost 27,500 flights.
                        Another Asian city-pair ranks top by number of flights -
                        planes take-off between Kuala Lumpur and Singapore every 18 minutes on average,
                        setting the record of 30,537 flights a year. This is also one of the shortest
                        international routes as the flight time is just over 1 hour.
                    </p>
                    <h4> Flight safety</h4>
                    <p>
                        Data shows that the odds of dying in a plane crash are 1 in 11,000,000,
                        which is genuinely impressive when compared to 1 in 5,000 for car accidents.
                    </p>

                    <h4> Luggage Safety</h4>
                    <p>
                        1.7 million bags was lost in 2019. Unfortunately, flying is not as safe
                        for your luggage - 2.5 million suitcases were reported lost
                        or mishandled between June and September per 1,000 passengers.
                    </p>
                    <h4> The most expensive plane ticket costs $43,535</h4>
                    <p>
                        This is the price for a round trip between New York and Hong Kong on a Lufthansa
                        flight featuring Michelin starred meals and a standalone seat and bed set up.
                    </p>
                </div>
                <div className="grid-col grid-col_4">
                    <RegisterForm type={type}/>

                    <center>
                        <h4>Already a Member?</h4>
                        <button className="btn btn_sizeSm" onClick={onLogin}>
                            Login
                        </button>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default LandingPageShipper;
