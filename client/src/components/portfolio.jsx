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
    const portfolioCurrencies = portfolioItems && Object.keys(portfolioItems);
    if (!portfolioCurrencies) {
      return (<p>Your portfolio seems to be empty...</p>);
    }
    return (
      <div>
        {
          portfolioCurrencies.map((symbol) => {
            const currencyData = currencies.all[symbol];
            const itemData = portfolioItems && portfolioItems[symbol];
            return <CurrencyCard key={symbol} currency={currencyData} number={itemData && itemData.number} />;
          })
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
