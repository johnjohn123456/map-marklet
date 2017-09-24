import uuid from 'uuid/v1';

const initialState = {
  markers: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_URL':
    return {
      ...state,
      markers: {
        ...state.markers,
        [uuid()]: {
          url: action.url,
          place: action.place,
          date: action.date,
        },
      },
    };
  default:
    return state;
  }
};

export default reducers;
