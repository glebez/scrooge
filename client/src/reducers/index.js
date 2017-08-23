import { combineReducers } from 'redux';
import currencies from './currencies';
import portfolio from './portfolio';

const scroogeApp = combineReducers({
  currencies,
  portfolio,
});

export default scroogeApp;
