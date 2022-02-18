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
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';


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
                    <Link to={`/request/${request.id}/edit`} ><EditIcon> <h2> edit </h2> </EditIcon></Link>
        </div>
        </CardContent>
        </Card>
       
        </div>
        <div className="searchResultBox">
           
                   {
                       searchResult.map(result => {
                           return (
                               <Card sx={{ margin: 0.5, marginLeft: 1 }}>
                                <CardContent>
                               <div className="requestDetailBox"
                                   key={result.id}
                                >
                                   <p> Location: {result.location}</p>
                                   <p> Departing city: {result.departing_city}</p>
                                   <p> Destination country: {result.destination_country}</p>
                                   <p> Destination city: {result.destination_city}</p>
                                   <p> Departure date: {result.departure_date}</p>
                                   <p> Arrival date: {result.arrival_date}</p>
                                   <p> Maximum weight limit: {result.weight_limit} lbs</p>
                                   <p> Note: {result.note}</p>
                                           <Popup trigger={<PermContactCalendarIcon onClick={contactFlyer}><h3>Contact</h3></PermContactCalendarIcon>} position="right center">
                                       <div style={{backgroundColor: "lightblue"}}>
                                       <h3> Flyer's Name: {result.first_name} {result.last_name}</h3>
                                       <h3> Contact: {result.contact}</h3>
                                       <h3> email: {result.email}</h3>
                                       </div>
                                   </Popup>
                                 
                                   {/* <button onClick={() => contactFlyer(result)}><h3> Contact </h3></button> */}

                                </div>
                                </CardContent>
                               </Card>

                           )
                       })

                   }
               
                
            </div>
            
        
         <div className="findFlyersBtn">
            <Link to="/userS"> <button className="btn" onClick={clearResult}>Back to Dashboard</button></Link>
         <button className="btn" onClick={searchFlyers}>Find Flyers</button>
         </div>
        </>
    )


}

export default RequestDetail