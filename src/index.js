import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import Scrooge from './Scrooge.jsx';
import scroogeApp from './reducers';
import './styles/globals';

const store = createStore(scroogeApp, applyMiddleware(reduxPackMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Scrooge />
  </Provider>,
  document.getElementById('scrooge'),
);
