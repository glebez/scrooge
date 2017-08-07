import React from 'react';
import ReactDOM from 'react-dom';
import Scrooge from './Scrooge.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import scroogeApp from './reducers';

const store = createStore(scroogeApp, applyMiddleware(reduxPackMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Scrooge />
  </Provider>,
  document.getElementById('scrooge')
);
