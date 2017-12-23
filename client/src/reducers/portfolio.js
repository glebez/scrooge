import { handle } from 'redux-pack';
import Actions from '../actions/const';

export const initialState = {
  items: {
    all: null,
    ordered: null,
  },
  isFetching: false,
  error: null,
  totalPurchaseCost: null,
  totalPurchaseCurrency: null,
  lastFetched: null,
};

export default function portfolio(state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_PORTFOLIO:
    case Actions.SAVE_PORTFOLIO:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: getError(action) }),
        success: prevState => handlePortfolioData(action, prevState),
      });

    case Actions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

function handlePortfolioData(action, prevState) {
  const data = getData(action);
  if (!data) return prevState;
  const { items, totalPurchaseCost, totalPurchaseCurrency } = data;
  return {
    ...prevState,
    items: {
      all: prepareAllItems(items),
      ordered: prepareOrderedItems(items),
    },
    totalPurchaseCost,
    totalPurchaseCurrency,
    lastFetched: Date.now(),
  };
}

function prepareAllItems(items) {
  return items && items.reduce((prev, curr) => ({ ...prev, [curr.code]: curr }), {});
}

function prepareOrderedItems(items) {
  return items.map(item => item.code);
}

function getError(action) {
  const data = getData(action);
  return data && data.error;
}

function getData(action) {
  const payloadData = action.payload && action.payload.data;
  return Array.isArray(payloadData) ? payloadData[0] : payloadData;
}

/**
 * Picks pairs of currency symbol and number hold for portfolio
 * @param {Object} state - portfolio redux state
 * @return [{symbol: string, number: number}]
 */

export function selectPortfolioItemPairs(state) {
  const { items: { all, ordered } = {} } = state;
  if (!all || !ordered) return [];
  return ordered.map(symbol => ({
    symbol,
    number: all[symbol].number,
  }));
}

export function selectTotalPurchaseCost(state) {
  return state && state.totalPurchaseCost;
}

export function selectOrderedPortfolioItems(state) {
  return state && state.items && state.items.ordered && state.items.all
    && state.items.ordered.map((code) => {
      const { number, purchaseCost } = state.items.all[code];
      return { number, purchaseCost, code };
    });
}

export function selectTotalPurchaseCurrency(state) {
  return state && state.totalPurchaseCurrency;
}

export function selectLastFetched(state) {
  return state && state.lastFetched;
}

export function selectIsFetching(state) {
  return state && state.isFetching;
}
