import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function EditRequest(){

    const dispatch = useDispatch();
    const params = useParams();

    const request = useSelector(store => store.requestDetail);
    console.log('this is the request to edit', request);

    useEffect(() => {
        dispatch({
            type: 'REQUEST_DETAIL',
            payload: params.id
        })
    }, []);

    return(
        <>
        <h2> in Edit Request </h2>
        </>
    )
}

export default EditRequest