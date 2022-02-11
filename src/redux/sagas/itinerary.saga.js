import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker saga: will be fired on "CREATE_ITINERARY" actions

function* createItinerary(action){
    try {
        yield axios.post('/api/user/itinerary', action.payload);

        // there could be a GET request but I'm undecided yet 
        // how I want to render a newly created itinerary

        // now I need to send ...

    } catch (error) {
        console.log('Error with creating itinerary', error);
        
    }
}// end function createItinerary

function* fetchItinerary(action) {
    try {
        const itinerary = yield axios.get('/api/user/itinerary');
        console.log('get itineraries', itinerary.data);
        yield put({type: 'SET_ITINERARY', payload: itinerary.data});
        
    } catch (error) {
        console.log('Error fetching itinerary', error);
    }
} // end function fetch itinerary

function* deleteItinerary(action) {
    try{
        const response = yield axios.delete(`/api/user/itinerary/${action.payload}`)
        // call the fetch function to get back itinerary and 
        //rerender
        yield put({
            type: 'FETCH_ITINERARY'
        })
    } catch (error) {
        console.log('Error deleting itinerary', error);
        
    }
}

function* itinerarySaga() {
    yield takeLatest('CREATE_ITINERARY', createItinerary);
    yield takeEvery('FETCH_ITINERARY', fetchItinerary);
    yield takeLatest('DELETE_ITINERARY', deleteItinerary)
}

export default itinerarySaga;