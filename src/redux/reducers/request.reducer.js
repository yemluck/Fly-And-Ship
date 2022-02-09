const requestReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_REQUEST':
            return action.payload;
        default:
            return state;
    }
}

export default requestReducer