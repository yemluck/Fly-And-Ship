import './ItineraryDetail.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import React, { useEffect } from 'react';
// mui components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';


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

        <div className="detailBox2">
        <Card sx={{ margin: 0.5, margin: "auto" }}>
         <CardContent>
        <div className="itineraryDetailBox">
            <p>location: {itinerary.location}</p>
            <p>Departing city:{itinerary.departing_city}</p>
            <p>Destination country: {itinerary.destination_country}</p>
            <p>Destination city: {itinerary.destination_city}</p>
            <p>Departure date: {itinerary.departure_date}</p>
            <p>Arrival date: {itinerary.arrival_date}</p>
            <p>Maximum weight: {itinerary.weight_limit}</p>
                    <Link to={`/itinerary/${itinerary.id}/edit` }><EditIcon className="editBtn"><h2> edit</h2></EditIcon></Link>
        </div>
        </CardContent>
        </Card>
        </div>
            <Link to="/userF"><button className="btn detailBtn"> Back to Dashboard </button></Link>
        </>
    )


}

export default ItineraryDetail