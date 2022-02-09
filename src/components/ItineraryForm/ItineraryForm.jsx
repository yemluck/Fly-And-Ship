import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ItineraryForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    // this is the logged in user
    const user=useSelector(store => store.user)

    const [location, setLocation] = useState('');
    const [departingCity, setDepartingCity] = useState('');
    const [destinationCountry, setDestinationCountry] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [weightLimit, setWeightLimit] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [note, setNote] = useState('');

    const createItinerary = (event) => {
        event.preventDefault();
        

        dispatch({
            type: 'CREATE_ITINERARY',
            payload: {
                location: location,
                departingCity: departingCity,
                destinationCountry: destinationCountry,
                destinationCity: destinationCity,
                weightLimit: weightLimit,
                departureDate: departureDate,
                arrivalDate: arrivalDate,
                note: note,
                userId: user.id
            }
        });

        dispatch({
            type: 'FETCH_ITINERARY'
        })
        history.push('/userF')
    }

    return(
        <form className="formPanel" onSubmit={createItinerary}>
        <div>
        <label htmlFor='location'>
            Location:
        <input
            type="text"
            name="location"
            value={location}
            required
            placeholder="1. Enter location"
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
            value={departingCity}
            required
            placeholder="2. Enter departing City"
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
            value={destinationCountry}
            required
            placeholder="3. Enter destination country"
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
            value={destinationCity}
            required
            placeholder="4. Enter destination city"
            onChange={(event) => setDestinationCity(event.target.value)}
        />
        </label>
        </div> 
        <div>
        <label htmlFor='weightLimit'>
            Weight limit:
        <input
            type="text"
            name="weightLimit"
            value={weightLimit}
            required
            placeholder="5. Enter weight limit"
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
            value={departureDate}
            required
            placeholder="6. Enter departure date"
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
            value={arrivalDate}
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
            value={note}
            required
            placeholder="8. Enter any comment"
            onChange={(event) => setNote(event.target.value)}
        />
        </label>
        </div>
        <div>
            <input className="btn" type="submit" name="create" value="Create" />
        </div>
        
        
        </form>
    )
}

export default ItineraryForm