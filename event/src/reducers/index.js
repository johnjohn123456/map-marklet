import uuid from 'uuid/v1';

const initialState = {
  urls: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_URL':
    return {
      ...state,
      urls: {
        ...state.urls,
        [uuid()]: {
          url: action.url,
          place: action.place,
        },
      },
    };
  default:
    return state;
  }
};

export default reducers;
