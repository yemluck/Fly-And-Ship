import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function RequestForm(){
    const history = useHistory();
    const dispatch = useDispatch();
    // this is the logged in user
    const user = useSelector(store => store.user)

    const [location, setLocation] = useState('');
    const [destinationCountry, setDestinationCountry] = useState('');
    const [earliestPickup, setEarliestPickup] = useState('');
    const [latestDelivery, setLatestDelivery] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('')

    const createRequest = (event) => {
        event.preventDefault();

        dispatch({
            type: 'CREATE_REQUEST',
            payload: {
                location: location,
                destinationCountry: destinationCountry,
                earliestPickup: earliestPickup,
                latestDelivery: latestDelivery,
                itemWeight: itemWeight,
                description: description,
                contact: contact,
                email: email,
                userId: user.id
            }
        });

        swal({
            title: "Shipping Request Created",
            text: "New shipping request created, contact flyers with matching Itinerary",
            icon: "success",
            button: "✅"
        })
            .then((value) => {
                // dispatch to fetch matching results i.e itinerary matching request
                dispatch({
                    type: 'FETCH_REQUEST_RESULT',
                    payload: {
                        country: destinationCountry,
                        pickup: earliestPickup,
                        delivery: latestDelivery,
                        weight: itemWeight
                    }
                })
                // dispatch to fetch newly created requests and old requests
                dispatch({
                    type: 'FETCH_REQUEST'
                })
                // back to dashboard
                history.push('/userS')
            })


    }

    return(
        <form className="formPanel" onSubmit={createRequest}>
            <div>
                <label htmlFor="location">
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={location}
                        required
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </label>
            </div>            
            <div>
                <label htmlFor="destinationCountry">
                    Destination country:
                    <input
                        type="text"
                        name="destinationCountry"
                        value={destinationCountry}
                        required
                        onChange={(event) => setDestinationCountry(event.target.value)}
                    />
                </label>
            </div>            
            <div>
                <label htmlFor="earliestPickup">
                    Earliest pickup:
                    <input
                        type="date"
                        name="earliestPickup"
                        value={earliestPickup}
                        required
                        onChange={(event) => setEarliestPickup(event.target.value)}
                    />
                </label>
            </div>            
            <div>
                <label htmlFor="latestDelivery">
                    Latest delivery:
                    <input
                        type="date"
                        name="latestDelivery"
                        value={latestDelivery}
                        required
                        onChange={(event) => setLatestDelivery(event.target.value)}
                    />
                </label>
            </div>   
            <div>
                <label htmlFor="itemWeight">
                    Max weight:
                    <input
                        type="number"
                        name="itemWeight"
                        value={itemWeight}
                        required
                        onChange={(event) => setItemWeight(event.target.value)}
                    />
                </label>
            </div>            
            <div>
                <label htmlFor="description">
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={description}
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
            </div>            
            <div>
                <label htmlFor="contact">
                    Contact:
                    <input
                        type="text"
                        name="contact"
                        value={contact}
                        required
                        onChange={(event) => setContact(event.target.value)}
                    />
                </label>
            </div> 
            <div>
                <label htmlFor="email">
                    email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <center><input className="btn" type="submit" name="create" value="create" /></center>
            </div>

        </form>
    )

}

export default RequestForm