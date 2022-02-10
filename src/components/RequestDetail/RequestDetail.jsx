import './RequestDetail.css'
import { Link  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';



function RequestDetail() {

    const request = useSelector(store => store.requestDetail[0]);
    console.log('this is the request from the store', request);

    //instead of getting from store, I need to dispatch
    // and get the request with the ID of the request
    // from the server
    // so I need an axios get
    // I don't need local state


    return(
        <>
        <h1> In request detail </h1>
        <h3>{request.id}</h3>
        <h3>{request.item_description}</h3>
        <h3>{request.item_weight}</h3>
        <h3>{request.destination_country}</h3>
        <h3>{request.earliest_pickup}</h3>
        <h3>{request.latest_delivery}</h3>
        <h3>{request.location}</h3>
        <h3>{request.contact}</h3>
        <h3>{request.email}</h3>

        

         <Link to="/userS"> <button> Back to Dashboard</button></Link>
        </>
    )


}

export default RequestDetail