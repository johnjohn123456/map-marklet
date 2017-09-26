import uuid from 'uuid/v1';

const initialState = {
  markers: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_MARKER':
    return {
      ...state,
      markers: {
        ...state.markers,
        //ids are stringified version of latLng
        [JSON.stringify(action.latLng)]: {
          url: action.url,
          title: action.title,
          desc: action.desc,
          place: action.place,
          latLng: action.latLng,
          date: action.date,
        },
      },
    };
  case 'DELETE_MARKER':
    return {
      ...state,
      markers: Object.keys(state.markers)
        .filter(latLng => {
          return latLng !== action.latLng;
        })
        .reduce((stateMarkers, latLng) => {
          stateMarkers[latLng] = state.markers[latLng];
          return stateMarkers;
        }, {}),
    };
  default:
    return state;
  }
};

export default reducers;
