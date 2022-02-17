import './RequestDetail.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import swal from 'sweetalert';
// mui components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';


function RequestDetail() {

    const dispatch = useDispatch()
    const params = useParams();
    // console.log to check details info
    console.log(params);
    console.log('this is the params id', params.id);
    console.log('type of params.id:', typeof params.id );


   const request = useSelector(store => store.requestDetail);
   console.log('this is the request from the store', request);

    //const requestId = params.id
    
    // use useEffect to fetch the information about the selected request
   useEffect(() => {
        dispatch({
            type: 'REQUEST_DETAIL',
            payload: params.id
        })
    }, [params.id])

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


    const contactFlyer = (result) => {
        console.log('in contactFlyer');
        // swal(`${result.first_name} ${result.last_name} `,`Phone No: ${result.contact} Email: ${result.email}`)
        swal({
            title: `${result.first_name} ${result.last_name} `,
            text: `Phone No: ${result.contact} Email: ${result.email}`
        })
    }

   

    return(
        <>
        <div className="requestDetailBox2">
         <Card sx={{ margin: 0.5, margin: "auto" }}>
        <CardContent>
        <div className="requestDetailBox">
        <h4><u>Request</u></h4>
        <p>Item description: {request.item_description}</p>
        <p>Item weight: {request.item_weight}</p>
        <p>Destination country: {request.destination_country}</p>
        <p>Earliest pickup: {request.earliest_pickup}</p>
        <p>Latest delivery: {request.latest_delivery}</p>
        <p>Present location: {request.location}</p>
        <p>Phone no: {request.contact}</p>
        <p>Email: {request.email}</p>
                    <Link to={`/request/${request.id}/edit`} ><button> <h2> edit </h2> </button></Link>
        </div>
        </CardContent>
        </Card>
       
        </div>
        <div className="detailBox">
            <div className="requestDetailBox">
                <h2>Available flyers matching request</h2>
            </div>
              

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
                                   <Popup trigger={<button onClick={contactFlyer}><h3>Contact</h3></button>} position="right center">
                                       <div>
                                       <h3> Flyer's Name: {result.first_name} {result.last_name}</h3>
                                       <h3> Contact: {result.contact}</h3>
                                       <h3> email: {result.email}</h3>
                                       </div>
                                   </Popup>
                                   {/* <button onClick={() => contactFlyer(result)}><h3> Contact </h3></button> */}

                                </div>

                           )
                       })

                   }
               
                
            </div>
            
        

            <Link to="/userS"> <button onClick={clearResult}> <h3>Back to Dashboard</h3></button></Link>
         <button onClick={searchFlyers}><h3>Find Flyers</h3></button>
        </>
    )


}

export default RequestDetail