import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import './UserPageShipper.css'

function UserPageShipper() {
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);

    const onCreateRequest = () => {
        console.log('in onCreateRequest');
    }
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
            </div>
            <div className="flyerBox">
                <p> Flyers</p>
            </div>
            <div>
                <button onClick={onCreateRequest}>create request</button>
            </div>
            <LogOutButton className="btn" />
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPageShipper;
