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

// chrome.identity.getAuthToken({
//   interactive: true,
// }, function (token) {
//   if (chrome.runtime.lastError) {
//     alert(chrome.runtime.lastError.message);
//     return;
//   }
//   var x = new XMLHttpRequest();
//   x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
//   x.onload = function () {
//     alert(x.response);
//   };
//   x.send();
// });

// chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
//   console.log('token ',token);
// });

wrapStore(store, {
  portName: 'RSC',
});
