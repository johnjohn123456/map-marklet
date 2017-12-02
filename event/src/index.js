import {
  createStore,
  applyMiddleware,
} from 'redux';
import reducers from './reducers';
import {wrapStore} from 'react-chrome-redux';
import {loadState, saveState} from './local-storage';
import logger from 'redux-logger';

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(logger)
);

store.subscribe(() => {
  saveState({
    markers: store.getState().markers,
  }, () => {
    //eslint-disable-next-line
    console.log(store.getState());
  });
});

wrapStore(store, {
  portName: 'RSC',
});
