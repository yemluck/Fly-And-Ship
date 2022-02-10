import './ItineraryDetail.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'


function ItineraryDetail() {

    const dispatch = useDispatch
    const params = useParams();
    console.log('params', params);

    dispatch({
        type: 'ITINERARY_DETAIL',
        payload: Number(params.id)
    })

    return(
        <>
        <h1> In itinerary details</h1>
        <Link to="/userF"><button> Back to Dashboard </button></Link>
        </>
    )


}

export default ItineraryDetail