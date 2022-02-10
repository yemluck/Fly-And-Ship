import './ItineraryDetail.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'


function ItineraryDetail() {

   const  itinerary = useSelector(store => store.itineraryDetail[0]);
   console.log('this is the itinerary detail from the store', itinerary);

    return(
        <>
        <div className="detailBox">
        <h1> In itinerary details</h1>
        <div className="itineraryDetailBox">
            <h3>{itinerary.location}</h3>
            <h3>{itinerary.destination_country}</h3>
            <h3>{itinerary.destination_city}</h3>
            <h3>{itinerary.departure_date}</h3>
            <h3>{itinerary.arrival_date}</h3>
            <h3>{itinerary.departing_city}</h3>
            <h3>{itinerary.id}</h3>
            <h3>{itinerary.weight_limit}</h3>
            
        </div>
        </div>
            <Link to="/userF"><button> Back to Dashboard </button></Link>
        </>
    )


}

export default ItineraryDetail