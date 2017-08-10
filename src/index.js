import React from 'react';
import ReactDOM from 'react-dom';
import Scrooge from './Scrooge.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import scroogeApp from './reducers';
import { css } from 'glamor'

const store = createStore(scroogeApp, applyMiddleware(reduxPackMiddleware));

css.global('html, body', { padding: 0 });
css.global('body', {
  backgroundImage: 'linear-gradient(-135deg, #B6FF86 0%, #9EFFDD 100%)',
  color: '#707070',
  fontFamily: "'Open Sans', sans-serif"
});

ReactDOM.render(
  <Provider store={store}>
    <Scrooge />
  </Provider>,
  document.getElementById('scrooge')
);
