import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* uploadPhoto(action) {
    try{
        console.log('in uploadPhotoSaga', action.payload);
        
        yield axios.post('/api/user/upload', action.payload);
        console.log('action.payload is: ', action.payload);

        
        // will need a dispatch action to fetch the upload later
        // trying to see a successful upload now
        yield put({ type: 'GET_PHOTO'})
        

    } catch(error) {
        console.log('Upload Photo failed', error);
    }
}

function* fetchPhoto(){
    console.log('in fetchPhoto');
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        let photo = yield axios.get('/api/user/upload', config);
        yield put ({
            type: 'SET_PHOTO',
            payload: photo.data
        })

    } catch (error) {
        console.log('Error with user login', error);
        
    }
    
}


function* uploadSaga() {
    yield takeLatest('UPLOAD', uploadPhoto)
    yield takeLatest('GET_PHOTO', fetchPhoto)
}

export default uploadSaga