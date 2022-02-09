const itineraryReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_ITINERARY':
            return action.payload;
        default:
            return state;
    }
}

export default itineraryReducer