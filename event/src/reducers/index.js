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
          name: action.name,
          url: action.url,
          center: action.center,
          address: action.address,
        },
      },
    };
  default:
    return state;
  }
};

export default reducers;
