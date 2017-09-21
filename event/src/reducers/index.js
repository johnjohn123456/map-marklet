const initialState = {
  count: 0,
  urls:[],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_COUNT':
    return Object.assign(
      {},
      state,
      { count: state.count + 1 }
    );
  // case 'ADD_URL':
  //   const urlConcat = state.url.concat([action.url]);
  //   return Object.assign(
  //     {},
  //     state,
  //     { url: urlConcat }
  //   );
  default:
    return state;
  }
};

export default reducers;
