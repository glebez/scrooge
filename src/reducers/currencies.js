import Actions from '../actions/const.js';
import { handle } from 'redux-pack';

const intialState = {
  currencies: [],
  isFetching: false,
  error: null
}

export default function currencies(state = intialState, action) {
  switch (action.type) {
    case Actions.FETCH_CURRENCIES:
      return handle(state, action, {
        start: (prevState) => Object.assign({}, prevState, {isFetching: true, error: null}),
        finish: (prevState) => Object.assign({}, prevState, { isFetching: false }),
        failure: (prevState) => Object.assign({}, prevState, { error: getError(action) }),
        success: (prevState) => Object.assign({}, prevState, { currencies: getCurrencies(action) })
      });

    default:
      return state
  }
}

function getError(action) {
  return action.payload && action.payload.data && action.payload.data.error;
}

function getCurrencies(action) {
  return action.payload && action.payload.data && action.payload.data;
}
