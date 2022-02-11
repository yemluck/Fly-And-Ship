import './RequestDetail.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';



function RequestDetail() {

    const dispatch = useDispatch()
    const params = useParams();
    // console.log to check details info
    console.log(params);
    console.log('this is the params id', params.id);
    console.log('type of params.id:', typeof params.id );


   const request = useSelector(store => store.requestDetail);
   console.log('this is the request from the store', request);

    const requestId = params.id
    
   useEffect(() => {
        dispatch({
            type: 'REQUEST_DETAIL',
            payload: requestId
        })
    }, [requestId])

 
    //instead of getting from store, I need to dispatch
    // and get the request with the ID of the request
    // from the server
    // so I need an axios get
    // I don't need local state


    return(
        <>
        <div className="detailBox">
        <h1> In request detail </h1>
        <div className="requestDetailBox">
        <h3>Item description: {request.item_description}</h3>
        <h3>Item weight: {request.item_weight}</h3>
        <h3>Destination country: {request.destination_country}</h3>
        <h3>Earliest pickup: {request.earliest_pickup}</h3>
        <h3>Latest delivery: {request.latest_delivery}</h3>
        <h3>Present location: {request.location}</h3>
        <h3>Phone no: {request.contact}</h3>
        <h3>Email: {request.email}</h3>
        </div>
        </div>
        

         <Link to="/userS"> <button> Back to Dashboard</button></Link>
        </>
    )


}

export default RequestDetail