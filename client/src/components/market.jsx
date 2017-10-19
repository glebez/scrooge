import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectMarketData } from '../reducers/currencies';
import CurrencyCard from './portfolio-item';

function Market({ marketData }) {
  if (!marketData) return null;
  return (
    <div>
      {
        marketData.map(cardProps => (
          <CurrencyCard key={cardProps.symbol} {...cardProps} />
        )).slice(0, 50)
      }
    </div>
  );
}

Market.propTypes = {
  marketData: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    marketData: selectMarketData(state.currencies),
  };
}

export default withRouter(connect(mapStateToProps)(Market));
