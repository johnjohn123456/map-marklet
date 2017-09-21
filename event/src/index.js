import {createStore} from 'redux';
import reducers from './reducers';
import {wrapStore} from 'react-chrome-redux';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

wrapStore(store, {
  portName: 'RSC',
});
