import axios from 'axios';
import Actions from './const';

export function fetchCurrencies() {
  return {
    type: Actions.FETCH_CURRENCIES,
    promise: axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR'),
  };
}

const mockPortfolio = {
  data: {
    baseCurrency: 'eur',
    totalPurchaseCost: 100000,
    currencies: {
      BTC: {
        number: 0.1234,
        purchaseCost: 100000,
      },
      ETH: {
        number: 2,
        purchaseCost: 70000,
      },
    },
  },
};

export function fetchPortfolio() {
  return {
    type: Actions.FETCH_PORTFOLIO,
    promise: Promise.resolve(mockPortfolio),
  };
}
