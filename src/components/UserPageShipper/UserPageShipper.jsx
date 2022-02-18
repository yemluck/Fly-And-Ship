import React, {  useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './UserPageShipper.css';
import swal from 'sweetalert';
// mui imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreSharpIcon from '@mui/icons-material/ReadMoreSharp';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

function UserPageShipper() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    const requests = useSelector(store => store.request);
    const image = useSelector(store => store.photoReducer)
    console.log('this is the requests in the store', requests);
    const results = useSelector(store => store.result)
    console.log('this is the results', results);


    const onCreateRequest = () => {
        console.log('in onCreateRequest');
    }

    // want to get all shipping request made by user on page load
    useEffect(() => {
        // dispatch to fetch user shipping requests
        dispatch({type: 'FETCH_REQUEST'});
        dispatch({ type: 'GET_PHOTO'}); // fetch profile picture on page load
    }, [requests.length]); // end useEffect

    const selectRequest = (request) => {
        console.log('in selectRequest');
    
        // move to detail page for individual request
        history.push(`/request/shipper/${request.id}`)
    }

    const deleteRequest = (id) => {
        //console.log('in deleteRequest', id);

        swal({
            title: "Delete?",
            text: "Are you sure, this is irreversible ",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((value) => {
                if (value) {
                    swal("Poof! deleted", { icon: "success" })
                    dispatch({
                        type: 'DELETE_REQUEST',
                        payload: id
                    }) // end dispatch
                    // trying something new
                  
                } else {
                    swal("Request not deleted")
                }
            })
        
        // dispatch({
        //     type: 'DELETE_REQUEST',
        //     payload: id
        // }) // end dispatch
    } // end function deleteRequest

    // setup to upload profile picture
    // initial state
    const [photo, setPhoto] = useState();

    // run this function on submission of upload form
    const onUploadPhoto = (evt) => {
        evt.preventDefault();
        console.log('in onUploadPhoto');
        const data = new FormData();

        data.append('image', photo)

        // dispatch to saga
        dispatch({
            type: 'UPLOAD',
            payload: data
        })



        setPhoto('');
    }

    return (
        <div className="container">
            <h2>Welcome to your dashboard, {user.first_name}!</h2>
          
            <div className="userProfileBox">
                <img src={`/images/${image.path}`} width={150} height={150} alt="upload profile picture" />
                <div>
                    <form onSubmit={onUploadPhoto}>
                        <input type="file" onChange={(evt) => setPhoto(evt.target.files[0])} /><br></br>
                        <input type="submit" name="upload" vale="upload" />
                    </form>
                </div>
            </div>

            <div className="requestBox">
                {
                    requests.map(request => {
                        return (
                            <Card sx={{ margin: 0.5, marginLeft: 1 }}>
                                <CardContent>
                            <div className="requestBox2"
                            key={request.id}
                            
                            >
                                <h4 className="cardHeading"><u>Request</u></h4>
                                <p>Location: {request.location}</p>
                                <p>Destination country: {request.destination_country}</p>
                                <p>Earliest pickup: {request.earliest_pickup}</p>
                                <p>Latest delivery: {request.latest_delivery}</p>
                                <p>Max weight: {request.item_weight} lbs</p>
                                <div className="cardBtn">
                                <ReadMoreSharpIcon onClick={() => selectRequest(request)}>detail</ReadMoreSharpIcon>
                                <DeleteIcon onClick={() => deleteRequest(request.id)}>delete</DeleteIcon>
                             </div>
                            </div>
                                </CardContent>
                            </Card>
                        )
                    })

                }

            </div>
            <div className="flyerBox">
                
                {
                    results.map( result => {
                        return (
                            <Card sx={{ margin: 0.5, marginLeft: 1 }}>
                            <CardContent>
                            <div className="requestBox2"
                            key={result.id}
                            >
                                <h4 className="cardHeading"><u>Matching itinerary</u></h4>
                                <p>Destination: {result.destination_country}</p>
                                <p>City: {result.destination_city}</p>
                                <p>Departure date:{result.departure_date}</p>
                                <p>Arrival date: {result.arrival_date}</p>
                                <p>Max weight: {result.weight_limit} lbs</p>
                                <p>Comment: {result.note}</p>
                                <PermContactCalendarIcon> contact </PermContactCalendarIcon>
                            </div>
                            </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
            <div className="createRequestBtn">
                <LogOutButton className="btn" />
                <Link to="/request"><button className="btn" onClick={onCreateRequest}>create request</button></Link>
            </div>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPageShipper;
