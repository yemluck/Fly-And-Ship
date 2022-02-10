const requestDetailReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_REQUEST_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

export default requestDetailReducer