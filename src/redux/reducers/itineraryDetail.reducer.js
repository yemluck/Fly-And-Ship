const itineraryDetailReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_ITINERARY_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

export default itineraryDetailReducer