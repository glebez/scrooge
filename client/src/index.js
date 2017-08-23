import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { rehydrate } from 'glamor';
import Scrooge from './Scrooge';
import scroogeApp from './reducers';
import './styles/globals';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
rehydrate(window.__REHYDRATION_IDS__);
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
delete window.__REHYDRATION_IDS__;

const store = createStore(scroogeApp, preloadedState, composeWithDevTools(applyMiddleware(reduxPackMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Scrooge />
    </BrowserRouter>
  </Provider>,
  document.getElementById('scrooge'),
);
