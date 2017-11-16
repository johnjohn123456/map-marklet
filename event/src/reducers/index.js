const initialState = {
  markers: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_MARKER':
    return {
      ...state,
      markers: [
        ...state.markers,
        action.marker,
      ],
    };
  case 'DELETE_MARKER':
    return {
      ...state,
      markers:
        state.markers.filter(marker => {
          return JSON.stringify(marker.latLng) !== action.latLng;
        }),
    };
  default:
    return state;
  }
};

export default reducers;
