import { handle } from 'redux-pack';
import Actions from '../actions/const';

const intialState = {
  all: null,
  byRank: null,
  isFetching: false,
  error: null,
};

export default function currencies(state = intialState, action) {
  switch (action.type) {
    case Actions.FETCH_CURRENCIES:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: getError(action) }),
        success: prevState => ({
          ...prevState,
          all: prepareCurrencies(action),
          byRank: prepareCurrenciesByRank(action),
        }),
      });

    default:
      return state;
  }
}

function getError(action) {
  const data = getData(action);
  return data && data.error;
}

function prepareCurrencies(action) {
  const data = getData(action);
  return data && data.reduce((result, current) =>
    ({ ...result,
      [current.symbol]: current,
    }), {});
}

function prepareCurrenciesByRank(action) {
  const data = getData(action);
  return data && data.map(currency => currency.symbol);
}

function getData(action) {
  return action.payload && action.payload.data;
}
