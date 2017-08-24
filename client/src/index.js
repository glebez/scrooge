import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { rehydrate } from 'glamor';
import Scrooge from './Scrooge';
import scroogeApp from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
const rehydrationIds = window.__REHYDRATION_IDS__;
if (rehydrationIds) rehydrate(window.__REHYDRATION_IDS__);
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
delete window.__REHYDRATION_IDS__;

const store = createStore(scroogeApp, preloadedState, composeWithDevTools(applyMiddleware(reduxPackMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Scrooge />
    </Router>
  </Provider>,
  document.getElementById('scrooge'),
);
