import { handle } from 'redux-pack';
import Actions from '../actions/const';

const intialState = {
  items: null,
  isFetching: false,
  error: null,
};

export default function portfolio(state = intialState, action) {
  switch (action.type) {
    case Actions.FETCH_PORTFOLIO:
      return handle(state, action, {
        start: prevState => Object.assign({}, prevState, { isFetching: true, error: null }),
        finish: prevState => Object.assign({}, prevState, { isFetching: false }),
        failure: prevState => Object.assign({}, prevState, { error: getError(action) }),
        success: (prevState) => {
          const { currencies, totalPurchaseCost, baseCurrency } = getData(action) || {};
          return Object.assign({}, prevState, {
            items: currencies,
            totalPurchaseCost,
            baseCurrency,
          });
        },
      });

    default:
      return state;
  }
}

function getError(action) {
  const data = getData(action);
  return data && data.error;
}

function getData(action) {
  return action.payload && action.payload.data && action.payload.data;
}
