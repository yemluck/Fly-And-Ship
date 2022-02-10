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






function* itineraryDetailSaga() {
    yield takeLatest('ITINERARY_DETAIL', fetchItineraryDetail);
}

export default itineraryDetailSaga