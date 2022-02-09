import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import './UserPageFlyer.css';
import { Link } from 'react-router-dom';


function UserPageFlyer() {

  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const itineraries = useSelector(store => store.itinerary)
  console.log('this is the itineraries from the store', itineraries);
  console.log('this is the user:', user);

  const onCreateItinerary = () => {
    console.log('in onCreateItinerary');
  }

  // want to call the function to get all itineraries on login to dashboard
  useEffect(() => {
    // dispatch to fetch user itineraries
    dispatch({type: 'FETCH_ITINERARY'});
    // There's opportunity to dispatch more than one type

  }, []); // end useEffect

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
        {
          itineraries.map((itinerary) => {
            return (
              <div className="itineraryBox2"
              key={itinerary.id}
              >
                <h4>{itinerary.departing_city}</h4>
                <h4>{itinerary.departure_date}</h4>
                <h4>{itinerary.arrival_date}</h4>
                <h4>{itinerary.destination_country}</h4>
                <h4>{itinerary.destination_city}</h4>
                <h4>{itinerary.location}</h4>
                <h4>{itinerary.note}</h4>
                <h4>{itinerary.weight_limit}</h4>
                <button>edit</button>
                <button>delete</button>
              </div>
            )
          })

        }
       
      </div>
      <div className="shippingRequestBox">
        <p> Shipping requests</p>
      </div>
      <div>
        <Link to="/itinerary"> <button onClick={onCreateItinerary}>create Itinerary</button> </Link>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPageFlyer;
