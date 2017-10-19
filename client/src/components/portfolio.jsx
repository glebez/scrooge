import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import glamorous from 'glamorous';
import { selectPortfolioCurrenciesData } from '../reducers/currencies';
import { selectPortfolioItemPairs, selectTotalPortfolioCost } from '../reducers/portfolio';
import PortfolioItem from './portfolio-item';
import Card from './card';
import { fetchPortfolio } from '../actions';


const PortfolioHeading = glamorous.h1({
  marginBottom: '15px',
  fontSize: '24px',
  fontWeight: 'normal',
  textAlign: 'center',
});

class Portfolio extends React.Component {
  componentDidMount() {
    const { token, portfolioItems, dispatch } = this.props;
    if (token && (!portfolioItems || !portfolioItems.length)) {
      dispatch(fetchPortfolio(token));
    }
  }

  render() {
    const { portfolioItems, summary } = this.props;
    if (!portfolioItems || !portfolioItems.length) {
      return (<p>Your portfolio seems to be empty...</p>);
    }
    return (
      <div>
        <PortfolioHeading>Your portfolio</PortfolioHeading>
        <Card {...summary} />
        {
          portfolioItems.map(portfolioItemProps => (
            <PortfolioItem key={portfolioItemProps.symbol} valueSize="big" {...portfolioItemProps} />
          ))
        }
      </div>
    );
  }
}

Portfolio.propTypes = {
  portfolioItems: PropTypes.array,
  summary: PropTypes.obj,
  token: PropTypes.string,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { token } = state.user || {};
  const portfolioItemPairs = selectPortfolioItemPairs(state.portfolio);
  const portfolioItems = selectPortfolioCurrenciesData(
    state.currencies,
    portfolioItemPairs,
  );
  const summary = {
    mainLabel: 'Total coins value',
    mainValue: portfolioItems.reduce((sum, item) => (sum + item.mainValue), 0),
    cost: selectTotalPortfolioCost(state.portfolio),
    valueCurrency: 'EUR',
    valueSize: 'big',
  };

  summary.diffs = [
    {
      label: `total diff ${summary.valueCurrency}`,
      value: (summary.mainValue - summary.cost).toFixed(3),
    },
    {
      label: 'total diff %',
      value: (((summary.mainValue / summary.cost) * 100) - 100).toFixed(3),
    },
  ];
  return {
    portfolioItems,
    summary,
    token,
  };
}

export default withRouter(connect(mapStateToProps)(Portfolio));
