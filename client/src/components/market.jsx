import React from 'react';
import PropTypes from 'prop-types';
import CurrencyCard from './currency-card';

function Market({ currencies }) {
  const { all, byRank } = currencies;
  if (!byRank) return null;
  return (
    <div>
      {
        byRank.map((symbol) => {
          const currencyData = all[symbol];
          return <CurrencyCard key={symbol} currency={currencyData}/>;
        }).slice(0, 50)
      }
    </div>
  );
}

Market.propTypes = {
  currencies: PropTypes.object,
};

export default Market;
