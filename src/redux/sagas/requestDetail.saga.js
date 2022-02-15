import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchRequestDetail(action) {
    console.log('This is the action', action);
    
    try {
        const requestDetail = yield axios.get(`/api/user/requestDetail/${action.payload}`
        
        );

        console.log('request detail result from server', requestDetail.data);
        // send response from server to reducer
        yield put ({type: 'SET_REQUEST_DETAIL', payload: requestDetail.data})
    
    } catch (error){
        console.log('Error fetching request detail', error);
        
    }
}

function* saveRequest(action) {
    try {
        yield axios.put(`api/user/requestDetail/${action.payload.id}`, action.payload);

        // refresh with the latest request data
        // will be refreshed on the new page
        // yield put ({
        //     type: 'REQUEST_DETAIL'
        // })

    } catch (err) {
        console.log('Error editing request detail', err);
        
    }
}




function* requestDetailSaga() {
    yield takeLatest('REQUEST_DETAIL', fetchRequestDetail);
    yield takeLatest('SAVE_REQUEST_CHANGES', saveRequest)
}

export default requestDetailSaga