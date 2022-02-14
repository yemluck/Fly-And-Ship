const resultDetailReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAIL_RESULT':
            return action.payload;
        case 'CLEAR_DETAIL_REQUEST_RESULT':
            return [];
        default:
            return state;
    }
}

export default resultDetailReducer