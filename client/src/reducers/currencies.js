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

/**
 * Selects data for single currency required for portfolio display from the state.
 *
 * @param  {Object} currency - object representing specific cryptocurrency
 * @param  {number} number - number of specific currency held in the portfolio
 * @return {Object}
 */
function selectPortfolioCurrencyData(currency, number = 1) {
  if (!currency) return {};
  const {
    name,
    rank,
    symbol,
    price_eur,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
  } = currency;
  return {
    name,
    symbol,
    rank,
    mainLabel: 'Value',
    mainValue: parseFloat(price_eur) * number,
    valueCurrency: 'EUR',
    diffs: [
      {
        label: '1h',
        value: percent_change_1h,
      },
      {
        label: '1d',
        value: percent_change_24h,
      },
      {
        label: '7d',
        value: percent_change_7d,
      },
    ],
  };
}

/**
 * Selects data for all currencies in the portfolio required for portfolio display.
 * @param {Object} state - currencies state
 * @param [{symbol: string, number: number}] portfolioData - array of portfolio currencty symbol and hold number
 * @return Object[]
 */
export function selectPortfolioCurrenciesData(state, portfolioData) {
  return portfolioData.map(portfolioItem => (
    selectPortfolioCurrencyData(state.all[portfolioItem.symbol], portfolioItem.number)
  ));
}

export function selectMarketData(state) {
  const { byRank } = state || {};
  return byRank && byRank.map(symbol => (
    selectPortfolioCurrencyData(state.all[symbol])
  ));
}

export function selectCurrencieCodeNamePairs(state) {
  return (
    state && state.all
    && Object.keys(state.all).sort().map(code => [code, state.all[code].name])
  ) || [];
}
