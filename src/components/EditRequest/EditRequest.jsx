import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function EditRequest(){

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const request = useSelector(store => store.requestDetail);
    console.log('this is the request to edit', request);

    useEffect(() => {
        dispatch({
            type: 'REQUEST_DETAIL',
            payload: params.id
        })
    }, [params.id]);

    const submitEdit = (evt) => {
        evt.preventDefault();
        console.log('in submitEdit');

       

        dispatch({
            type: 'SAVE_REQUEST_CHANGES',
            payload: request
        })
       
        history.push(`/request/shipper/${request.id}`)
    }

    return(
        <>
        <h2> in Edit Request </h2>
            <form className="formPanel" onSubmit={submitEdit}>
                <div>
                    <label htmlFor="location">
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={request.location}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: {location: evt.target.value}
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="destinationCountry">
                        Destination country:
                        <input
                            type="text"
                            name="destinationCountry"
                            value={request.destination_country}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { destination_country: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="earliestPickup">
                        Earliest pickup:
                        <input
                            type="date"
                            name="earliestPickup"
                            value={request.earliest_pickup}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { earliest_pickup: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="latestDelivery">
                        Latest delivery:
                        <input
                            type="date"
                            name="latestDelivery"
                            value={request.latest_delivery}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { latest_delivery: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="itemWeight">
                        Max weight:
                        <input
                            type="number"
                            name="itemWeight"
                            value={request.item_weight}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { item_weight: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="description">
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={request.item_description}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { item_description: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="contact">
                        Contact:
                        <input
                            type="text"
                            name="contact"
                            value={request.contact}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { contact: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="email">
                        email:
                        <input
                            type="text"
                            name="email"
                            value={request.email}
                            required
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_ACTIVE_REQUEST',
                                payload: { email: evt.target.value }
                            })}
                        />
                    </label>
                </div>
                <div>
                    <input className="btn" type="submit" name="Done" value="Done" />
                </div>

            </form>
        </>
    )
}

export default EditRequest