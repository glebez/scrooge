import { handle } from 'redux-pack';
import Actions from '../actions/const';

export const initialState = {
  items: null,
  isFetching: false,
  error: null,
  totalPurchaseCost: null,
  totalPurchaseCurrency: null,
};

export function portfolio(state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_PORTFOLIO:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: getError(action) }),
        success: (prevState) => {
          const data = getData(action);
          if (!data) return prevState;
          const { items, totalPurchaseCost, totalPurchaseCurrency } = data;
          return {
            ...prevState,
            items: prepareItems(items),
            totalPurchaseCost,
            totalPurchaseCurrency,
          };
        },
      });

    case Actions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export default portfolio;

function prepareItems(items) {
  return items && items.reduce((prev, curr) => Object.assign({}, prev, { [curr.code]: curr }), {});
}

function getError(action) {
  const data = getData(action);
  return data && data.error;
}

function getData(action) {
  return action.payload && action.payload.data;
}
