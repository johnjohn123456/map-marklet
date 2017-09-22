import {
  createStore,
  applyMiddleware,
} from 'redux';
import reducers from './reducers';
import {wrapStore} from 'react-chrome-redux';
import logger from 'redux-logger';

const store = createStore(
  reducers,
  applyMiddleware(logger)
);

wrapStore(store, {
  portName: 'RSC',
});
