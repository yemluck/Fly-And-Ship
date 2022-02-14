import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';;

// worker saga will be fired on "FETCH_REQUEST_RESULT"

function* fetchRequestResult(action){
   // console.log('*************', { params: {destination_country} });
    try {
        const result = yield axios.get('/api/user/result', 
        {params: {
            destination_country: action.payload.country,
            arrival_date: action.payload.delivery,
            departure_date: action.payload.pickup,
            weight_limit: action.payload.weight

        }});
        //console.log('*************', {params: destination_country});
        
        console.log('get result', result.data);
        // send response from server to reducer
        yield put({type: 'SET_RESULT', payload: result.data})
        

    } catch (error) {
        console.log('Error fetching request results', error);
    }
}

function* fetchDetailRequestResult(action){

    try {
        const result = yield axios.get('/api/user/detailResult',
            {
                params: {
                    destination_country: action.payload.country,
                    arrival_date: action.payload.delivery,
                    departure_date: action.payload.pickup,
                    weight_limit: action.payload.weight

                }
            });
        //console.log('*************', {params: destination_country});

        console.log('get result', result.data);
        // send response from server to reducer
       yield put({ type: 'SET_DETAIL_RESULT', payload: result.data })


    } catch (error) {
        console.log('Error fetching request results', error);
    }

}



function* resultSaga () {
    yield takeEvery('FETCH_REQUEST_RESULT', fetchRequestResult),
    yield takeEvery('FETCH_DETAIL_REQUEST_RESULT', fetchDetailRequestResult)
    
}

export default resultSaga