import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPageFlyer.css'

const onCreateItinerary = () => {
  console.log('in onCreateItinerary');
}

function UserPageFlyer() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  console.log('this is the user:', user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p> Your type is: {user.type}</p>
      <p> Your last name is: {user.last_name}</p>
      <div className="userProfileBox">
        <p>profile picture here</p>
        <button>upload picture</button>
      </div>
      <div className="itineraryBox">
        <p> Itineraries are here</p>
      </div>
      <div className="shippingRequestBox">
        <p> Shipping requests</p>
      </div>
      <div>
        <button onClick={onCreateItinerary}>create Itinerary</button>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPageFlyer;
