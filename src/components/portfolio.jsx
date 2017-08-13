import React from 'react';
import glamorous from 'glamorous';
import { colors } from '../styles/variables';
import CurrencyCard from './currency-card';

export default class Portfolio extends React.Component {
  render() {
    const { items, currencies, baseCurrency, totalPurchaseCost } = this.props;
    if (!items) return null;
    return (
      <div>
        {
        Object.keys(items).map((symbol) => {
          const currencyData = currencies[symbol];
          return <CurrencyCard key={symbol} currency={currencyData} number={items[symbol].number} />
        })
        }
      </div>
    )
  }
}
