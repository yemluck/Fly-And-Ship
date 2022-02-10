import './RequestDetail.css'
import { Link, useParams  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'



function RequestDetail() {

    const dispatch = useDispatch
    const params = useParams()
    console.log('params', params.id);

    dispatch ({
        type: 'REQUEST_DETAIL',
        payload: Number(params.id)
    })

    //instead of getting from store, I need to dispatch
    // and get the request with the ID of the request
    // from the server
    // so I need an axios get
    // I don't need local state


    return(
        <>
        <h1> In request detail </h1>
         <Link to="/userS"> <button> Back to Dashboard</button></Link>
        </>
    )


}

export default RequestDetail