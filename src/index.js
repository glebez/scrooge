import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { composeWithDevTools } from 'redux-devtools-extension';
import Scrooge from './Scrooge.jsx';
import scroogeApp from './reducers';
import './styles/globals';

const store = createStore(scroogeApp, composeWithDevTools(applyMiddleware(reduxPackMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <Scrooge />
  </Provider>,
  document.getElementById('scrooge'),
);
