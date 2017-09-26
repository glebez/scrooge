import React from 'react';
import PropTypes from 'prop-types';
import CurrencyCard from './currency-card';
import { fetchPortfolio } from '../actions';

class Portfolio extends React.Component {
  componentDidMount() {
    const { token, portfolio, dispatch } = this.props;
    if (token && (!portfolio || portfolio.items == null)) {
      dispatch(fetchPortfolio(token));
    }
  }

  render() {
    const { currencies, portfolio } = this.props;
    const portfolioItems = portfolio && portfolio.items;
    const items = (portfolioItems && Object.keys(portfolioItems)) || currencies.byRank;
    if (!items) return null;
    return (
      <div>
        {
          items.map((symbol) => {
            const currencyData = currencies.all[symbol];
            const itemData = items[symbol];
            return <CurrencyCard key={symbol} currency={currencyData} number={itemData && itemData.number} />;
          }).slice(0, 50)
        }
      </div>
    );
  }
}

Portfolio.propTypes = {
  portfolio: PropTypes.object,
  currencies: PropTypes.object,
  token: PropTypes.string,
  dispatch: PropTypes.func,
};

export default Portfolio;
