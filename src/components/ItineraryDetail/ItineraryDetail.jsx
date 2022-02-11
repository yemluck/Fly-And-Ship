import './ItineraryDetail.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import React, { useEffect } from 'react';


function ItineraryDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    // itinerary from store
    const  itinerary = useSelector(store => store.itineraryDetail);
    console.log('this is the itinerary detail from the store', itinerary);

    useEffect(() => {
        dispatch({
            type: 'ITINERARY_DETAIL',
            payload: params.id
        })
    },[params.id])

    return(
        <>
        <div className="detailBox">
        <h1> In itinerary details</h1>
        <div className="itineraryDetailBox">
            <h3>location: {itinerary.location}</h3>
            <h3>Departing city:{itinerary.departing_city}</h3>
            <h3>Destination country: {itinerary.destination_country}</h3>
            <h3>Destination city: {itinerary.destination_city}</h3>
            <h3>Departure date: {itinerary.departure_date}</h3>
            <h3>Arrival date: {itinerary.arrival_date}</h3>
            <h3>Maximum weight: {itinerary.weight_limit}</h3>
            
        </div>
        </div>
            <Link to="/userF"><button> Back to Dashboard </button></Link>
        </>
    )


}

export default ItineraryDetail