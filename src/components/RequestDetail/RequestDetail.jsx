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

    const searchFlyers  = () => {
        console.log('in on searchFlyers');

        dispatch({
            type: 'FETCH_DETAIL_REQUEST_RESULT',
            payload: {
                country: request.destination_country,
                pickup: request.earliest_pickup,
                delivery: request.latest_delivery,
                weight: request.item_weight
            }
        })
    }

    const clearResult = () => {
        console.log('in clearResult');
        dispatch({
            type: 'CLEAR_DETAIL_REQUEST_RESULT'
        })
    } // end function clearResult

    const searchResult = useSelector(store => store.resultDetail)
    //instead of getting from store, I need to dispatch
    // and get the request with the ID of the request
    // from the server
    // so I need an axios get
    // I don't need local state
    console.log('this is the searchResult', searchResult);


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
        <div className="detailBox">
            <div className="requestDetailBox">
                <h2>Available flyers matching request</h2>
            </div>
              
                   {/* TO DO: Join the user table
                   to the query so I can easily
                   access the customer name */}

                   {
                       searchResult.map(result => {
                           return (
                               <div className="requestDetailBox"
                                   key={result.id}
                                >
                                   <h3> Location: {result.location}</h3>
                                   <h3> Departing city: {result.departing_city}</h3>
                                   <h3> Destination country: {result.destination_country}</h3>
                                   <h3> Destination city: {result.destination_city}</h3>
                                   <h3> Departure date: {result.departure_date}</h3>
                                   <h3> Arrival date: {result.arrival_date}</h3>
                                   <h3> Maximum weight limit: {result.weight_limit}</h3>
                                   <h3> Note: {result.note}</h3>

                                </div>

                           )
                       })

                   }
                   {/* <h3> Location: {searchResult.location}</h3>
                   <h3> Departing city: {searchResult.departing_city}</h3>
                   <h3> Destination country: {searchResult.destination_country}</h3>
                   <h3> Destination city: {searchResult.destination_city}</h3>
                   <h3> Departure date: {searchResult.departure_date}</h3>
                   <h3> Arrival date: {searchResult.arrival_date}</h3>
                   <h3> Maximum weight limit: {searchResult.weight_limit}</h3>
                   <h3> Note: {searchResult.note}</h3> */}
                
            </div>
            
        

            <Link to="/userS"> <button onClick={clearResult}> <h3>Back to Dashboard</h3></button></Link>
         <button onClick={searchFlyers}><h3>Find Flyers</h3></button>
        </>
    )


}

export default RequestDetail