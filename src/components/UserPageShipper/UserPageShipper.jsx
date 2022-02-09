import React, {  useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserPageShipper.css';

function UserPageShipper() {

    const dispatch = useDispatch()
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    const requests = useSelector(store => store.request);
    console.log('this is the requests in the store', requests);
    const results = useSelector(store => store.result)
    console.log('this is the results', results);


    const onCreateRequest = () => {
        console.log('in onCreateRequest');
    }

    // want to get all shipping request made by user on page load
    useEffect(() => {
        // dispatch to fetch user shipping requests
        dispatch({type: 'FETCH_REQUEST'});
    }, []); // end useEffect





    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p> Your type is: {user.type}</p>
            <div className="userProfileBox">
                <p>profile picture here</p>
                <button>upload picture</button>
            </div>
            <div className="requestBox">
                <p> requests are here</p>
                {
                    requests.map(request => {
                        return (
                            <div className="requestBox2"
                            key={request.id}
                            >
                                <h4>Location: {request.location}</h4>
                                <h4>Destination country: {request.destination_country}</h4>
                                <h4>Earliest pickup: {request.earliest_pickup}</h4>
                                <h4>Latest delivery: {request.latest_delivery}</h4>
                                <h4>Max weight: {request.item_weight}</h4>
                                <h4>Phone No: {request.contact}</h4>
                                <h4>Email: {request.email}</h4>
                                <h4>Item description: {request.item_description}</h4>
                                <button>edit</button>
                                <button>delete</button>
                            </div>
                        )
                    })

                }

            </div>
            <div className="flyerBox">
                <p> Flyers</p>
                {
                    results.map( result => {
                        return (
                            <div className="requestBox2"
                            key={result.id}
                            >
                                <h4>Destination: {result.destination_country}</h4>
                                <h4>City: {result.destination_city}</h4>
                                <h4>Departure date:{result.departure_date}</h4>
                                <h4>Arrival date: {result.arrival_date}</h4>
                                <h4>Max weight: {result.weight_limit}</h4>
                                <h4>Comment: {result.note}</h4>
                                <button> contact </button>
                                <button> delete </button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Link to="/request"><button onClick={onCreateRequest}>create request</button></Link>
            </div>
            <LogOutButton className="btn" />
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPageShipper;
