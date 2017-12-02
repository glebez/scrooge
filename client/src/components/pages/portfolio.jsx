import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import glamorous from 'glamorous';
import { selectPortfolioCurrenciesData } from '../../reducers/currencies';
import { selectPortfolioItemPairs, selectTotalPurchaseCost } from '../../reducers/portfolio';
import { selectToken } from '../../reducers/user';
import PortfolioItem from '../molecules/portfolio-item';
import Card from '../molecules/card';
import { fetchPortfolio } from '../../actions';


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
    const { portfolioItems, summaryDataRows } = this.props;
    if (!portfolioItems || !portfolioItems.length) {
      return (<p>Your portfolio seems to be empty...</p>);
    }
    return (
      <div>
        <PortfolioHeading>Your portfolio</PortfolioHeading>
        <Card dataRows={summaryDataRows} css={{ marginBottom: '35px' }} />
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
  summaryDataRows: PropTypes.array,
  token: PropTypes.string,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { user, portfolio } = state;
  const token = selectToken(user);
  const portfolioItemPairs = selectPortfolioItemPairs(portfolio);
  const portfolioItems = selectPortfolioCurrenciesData(
    state.currencies,
    portfolioItemPairs,
  );
  const portfolioCost = selectTotalPurchaseCost(portfolio);
  const summaryDataRows = selectSummaryData(portfolioCost, portfolioItems);

  return {
    portfolioItems,
    summaryDataRows,
    token,
  };
}

function selectSummaryData(portfolioCost, portfolioItems) {
  const portfolioValue = portfolioItems.reduce((sum, item) => (sum + item.mainValue), 0);
  const baseCurrency = 'EUR';
  return [
    {
      mainLabel: 'Total coins value',
      mainValue: portfolioValue,
      valueCurrency: baseCurrency,
      valueSize: 'big',
      diffs: selectSummaryRecentDiffs(portfolioValue, portfolioItems),
    },
    {
      mainLabel: 'Purchase cost',
      mainValue: portfolioCost,
      valueCurrency: baseCurrency,
      diffs: selectSummaryTotalDiffs(portfolioCost, portfolioValue, baseCurrency),
    },
  ];
}

function selectSummaryRecentDiffs(value, portfolioItems) {
  return [
    {
      label: '1h',
      value: calculatePortfolioDiff(portfolioItems, value, 0),
    },
    {
      label: '1d',
      value: calculatePortfolioDiff(portfolioItems, value, 1),
    },
    {
      label: '7d',
      value: calculatePortfolioDiff(portfolioItems, value, 2),
    },
  ];
}

function selectSummaryTotalDiffs(cost, value, baseCurrency) {
  return [
    {
      label: `total diff ${baseCurrency}`,
      value: (value - cost).toFixed(3),
    },
    {
      label: 'total diff %',
      value: (((value / cost) * 100) - 100).toFixed(3),
    },
  ];
}

function calculatePortfolioDiff(portfolioItems, portfolioValue, diffIndex) {
  return (portfolioItems.reduce((sum, item) => (
    sum + (item.mainValue * item.diffs[diffIndex].value)), 0) / portfolioValue).toFixed(3);
}

export default withRouter(connect(mapStateToProps)(Portfolio));
