import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import glamorous from 'glamorous';
import { selectPortfolioCurrenciesData } from '../../reducers/currencies';
import { selectPortfolioItemPairs, selectTotalPurchaseCost, selectIsFetching } from '../../reducers/portfolio';
import { selectToken } from '../../reducers/user';
import PortfolioItem from '../molecules/portfolio-item';
import Card from '../molecules/card';
import ReloadButton from '../atoms/reload-button';
import { fetchPortfolio, fetchCurrencies } from '../../actions';

const PortfolioHeading = glamorous.h1({
  marginBottom: '15px',
  fontSize: '24px',
  fontWeight: 'normal',
  textAlign: 'center',
});

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }
  componentDidMount() {
    this.fetchPortfolio();
  }

  fetchPortfolio() {
    const { token, dispatch } = this.props;
    if (token) {
      dispatch(fetchPortfolio(token));
    }
  }

  fetchCurrencies() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { portfolioItems, summaryDataRows, isFetching } = this.props;
    if (!portfolioItems || !portfolioItems.length) {
      return (<p>Your portfolio seems to be empty...</p>);
    }
    return (
      <div>
        <ReloadButton onClick={this.fetchCurrencies} isSpinning={isFetching}>
          <span>&#8635;</span>
        </ReloadButton>
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
  isFetching: PropTypes.bool,
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
  const isFetching = selectIsFetching(portfolio);

  return {
    portfolioItems,
    summaryDataRows,
    token,
    isFetching,
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
