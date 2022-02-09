import React, {  useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserPageShipper.css';

function UserPageShipper() {

    const dispatch = useDispatch()
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    const requests = useSelector(store => store.request)
    console.log('this is the requests in the store', requests);
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
                                <h4>{request.location}</h4>
                                <h4>{request.destination_country}</h4>
                                <h4>{request.earliest_pickup}</h4>
                                <h4>{request.latest_delivery}</h4>
                                <h4>{request.contact}</h4>
                                <h4>{request.email}</h4>
                                <h4>{request.item_description}</h4>
                                <button>edit</button>
                                <button>delete</button>
                            </div>
                        )
                    })

                }

            </div>
            <div className="flyerBox">
                <p> Flyers</p>
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
