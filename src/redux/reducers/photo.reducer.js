const photoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PHOTO':
            return action.payload;
        default:
            return state;
    }
}

export default photoReducer