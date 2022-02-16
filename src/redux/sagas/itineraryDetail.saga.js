import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchItineraryDetail(action) {
    console.log('This is the action', action);

    try {
        const itineraryDetail = yield axios.get('/api/user/itineraryDetail',
            {
                params: {
                    id: action.payload
                }
            }
        );

        console.log('itinerary detail result from server', itineraryDetail.data);
        // send response from server to reducer
        yield put({ type: 'SET_ITINERARY_DETAIL', payload: itineraryDetail.data })

    } catch (error) {
        console.log('Error fetching itinerary detail', error);

    }
}

function* saveItinerary(action) {
    try{
        yield axios.put(`api/user/itineraryDetail/${action.payload.id}`, action.payload);
    } catch (err) {
        console.log('Error editing itinerary detail', err);
        
    }
}





function* itineraryDetailSaga() {
    yield takeLatest('ITINERARY_DETAIL', fetchItineraryDetail);
    yield takeLatest('SAVE_ITINERARY_CHANGES', saveItinerary)
}

export default itineraryDetailSaga