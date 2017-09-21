import uuid from 'uuid/v1';

const initialState = {
  count: 0,
  urls: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_COUNT':
    return {
      ...state,
      count: state.count + 1,
    };
  case 'ADD_URL':
    return {
      ...state,
      urls: {
        ...state.urls,
        [uuid()]: {
          url: action.url,
          // location: action.location,
        },
      },
    };
  default:
    return state;
  }
};

export default reducers;
