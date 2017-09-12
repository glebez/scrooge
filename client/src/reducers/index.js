import { combineReducers } from 'redux';
import currencies from './currencies';
import portfolio from './portfolio';
import user from './user';

const scroogeApp = combineReducers({
  currencies,
  portfolio,
  user,
});

export default scroogeApp;
