import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function EditItinerary() {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const itinerary = useSelector(store => store.itineraryDetail);
    console.log('this is the itinerary to edit', itinerary);

    useEffect(() => {
        dispatch({
            type: 'ITINERARY_DETAIL',
            payload: params.id
        })
    }, [params.id])

    const submitEdit = (evt) => {
        evt.preventDefault();
        console.log('in submitEdit');

        // need to dispatch the changes so it goes to the server

        // dispatch({
            //type: 'SAVE_ITINERARY_CHANGES',
            //payload: itinerary
       // })

        // need to redirect back to the detail page
        // history.push(`/itinerary/flyer/${itinerary.id}`)
    }




    return(
        <>
        <h2> in Edit Itinerary</h2>
            <form className="formPanel" onSubmit={submitEdit}>
                <div>
                    <label htmlFor='location'>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={itinerary.location}
                            required
                            onChange={(event) => setLocation(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='departingCity'>
                        Departing City:
                        <input
                            type="text"
                            name="departingCity"
                            value={itinerary.departing_city}
                            required
                            onChange={(event) => setDepartingCity(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='destination'>
                        Destination country:
                        <input
                            type="text"
                            name="destination"
                            value={itinerary.destination_country}
                            required
                            onChange={(event) => setDestinationCountry(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='destinationCity'>
                        Destination city:
                        <input
                            type="text"
                            name="destinationCity"
                            value={itinerary.destination_city}
                            required
                            onChange={(event) => setDestinationCity(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='weightLimit'>
                        Weight limit:
                        <input
                            type="number"
                            name="weightLimit"
                            value={itinerary.weight_limit}
                            required
                            onChange={(event) => setWeightLimit(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='departureDate'>
                        Departure date:
                        <input
                            type="date"
                            name="departureDate"
                            value={itinerary.departure_date}
                            required
                            onChange={(event) => setDepartureDate(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='arrivalDate'>
                        Arrival date:
                        <input
                            type="date"
                            name="arrivalDate"
                            value={itinerary.arrival_date}
                            required
                            placeholder="7. Enter arrival date"
                            onChange={(event) => setArrivalDate(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='note'>
                        Note:
                        <input
                            type="text"
                            name="note"
                            value={itinerary.note}
                            onChange={(event) => setNote(event.target.value)}
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

export default EditItinerary