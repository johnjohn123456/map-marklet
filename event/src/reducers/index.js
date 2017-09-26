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
        [uuid()]: {
          url: action.url,
          title: action.title,
          place: action.place,
          latLng: action.latLng,
          date: action.date,
        },
      },
    };
  default:
    return state;
  }
};

export default reducers;
