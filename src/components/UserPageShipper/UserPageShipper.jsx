import React, {  useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './UserPageShipper.css';
import swal from 'sweetalert';

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
    }, []); // end useEffect

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
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p> Your type is: {user.type}</p>
            <p> Your last name is {user.last_name}</p>
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
                <p> requests are here</p>
                {
                    requests.map(request => {
                        return (
                            <div className="requestBox2"
                            key={request.id}
                            
                            >
                                <h4>Location: {request.location}</h4>
                                <h4>Destination country: {request.destination_country}</h4>
                                <h4>Earliest pickup: {request.earliest_pickup}</h4>
                                <h4>Latest delivery: {request.latest_delivery}</h4>
                                <h4>Max weight: {request.item_weight}</h4>
                                <h4>Item description: {request.item_description}</h4>
                                <button onClick={() => selectRequest(request)}>detail</button>
                                <button onClick={() => deleteRequest(request.id)}>delete</button>
                            </div>
                        )
                    })

                }

            </div>
            <div className="flyerBox">
                <p> Flyers</p>
                {
                    results.map( result => {
                        return (
                            <div className="requestBox2"
                            key={result.id}
                            >
                                <h4>Destination: {result.destination_country}</h4>
                                <h4>City: {result.destination_city}</h4>
                                <h4>Departure date:{result.departure_date}</h4>
                                <h4>Arrival date: {result.arrival_date}</h4>
                                <h4>Max weight: {result.weight_limit}</h4>
                                <h4>Comment: {result.note}</h4>
                                <button> contact </button>
                                <button> delete </button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Link to="/request"><button onClick={onCreateRequest}>create request</button></Link>
            </div>
            <LogOutButton className="btn" />
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPageShipper;
