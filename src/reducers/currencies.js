import Actions from '../actions/const.js';
import { handle } from 'redux-pack';

const intialState = {
  all: null,
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
        success: (prevState) => Object.assign({}, prevState, { all: prepareCurrencies(action) })
      });

    default:
      return state
  }
}

function getError(action) {
  const data = getData(action);
  return data && data.error;
}

function prepareCurrencies(action) {
  const data = getData(action);
  return data && data.reduce(function(result, current) {
    return Object.assign({}, result, {
      [current.symbol]: current
    })
  }, {});
}

function getData(action) {
  return action.payload && action.payload.data && action.payload.data;
}
