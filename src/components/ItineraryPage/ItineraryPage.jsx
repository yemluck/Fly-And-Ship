import './ItineraryPage.css'
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItineraryForm from '../ItineraryForm/ItineraryForm';



function Itinerary (){
    const user = useSelector(store=>store.user)
    return( 
        <>
        <h3 style={{width: "15%", margin: "auto", marginBottom: "10px"}} > Create New Itinerary </h3>
        <ItineraryForm />
        <Link to="/userF"><button className="btn cancelBtn" >cancel</button></Link>
        </>
    )
}

export default Itinerary