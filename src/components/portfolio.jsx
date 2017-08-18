import React from 'react';
import PropTypes from 'prop-types';
import CurrencyCard from './currency-card';

class Portfolio extends React.Component {
  render() {
    const { items, currencies } = this.props;
    if (!items) return null;
    return (
      <div>
        {
          Object.keys(items).map((symbol) => {
            const currencyData = currencies[symbol];
            return <CurrencyCard key={symbol} currency={currencyData} number={items[symbol].number} />;
          })
        }
      </div>
    );
  }
}

Portfolio.propTypes = {
  items: PropTypes.object,
  currencies: PropTypes.object,
};

export default Portfolio;
