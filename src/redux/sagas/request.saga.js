import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker saga: will be fired on "CREATE_REQUEST" actions

function* createRequest(action){
    try {
            yield axios.post('/api/user/request', action.payload)
    } catch(error){
        console.log('Error with creating request', error);
        
    }
} // end function createRequest





function* requestSaga() {
    yield takeLatest('CREATE_REQUEST', createRequest)
}


export default requestSaga