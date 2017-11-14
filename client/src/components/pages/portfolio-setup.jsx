import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardBody } from '../molecules/card';
import PortfolioSetupInputRow, { PortfolioSetupRowWrapper } from '../molecules/portfolio-setup-input-row';
import { selectOrderedPortfolioItems } from '../../reducers/portfolio';
import { selectCurrencieCodeNamePairs } from '../../reducers/currencies';

class PortfolioSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.portfolioItems,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAutosuggestSelect = this.handleAutosuggestSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.values && nextProps.portfolioItems) {
      this.setState({ values: nextProps.portfolioItems });
    }
  }

  renderInputRows() {
    const { currencieCodeNamePairs } = this.props;
    const { values } = this.state;
    return (values && values.map((item, index) => (
      <PortfolioSetupInputRow
        key={index}
        index={index}
        currencieCodeNamePairs={currencieCodeNamePairs}
        onChange={this.handleInputChange}
        onAutosuggestSelect={value => this.handleAutosuggestSelect(index, value)}
        values={item} />
    ))) || [];
  }

  handleInputChange(e) {
    e.preventDefault();
    const [index, name] = e.target.name.split('.');
    const values = this.state.values.slice();
    values[index] = {
      ...values[index],
      [name]: e.target.value,
    };
    this.setState({ values });
  }

  handleAutosuggestSelect(index, value) {
    const values = this.state.values.slice();
    values[index] = {
      ...values[index],
      code: value,
    };
    this.setState({ values });
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <CardBody>
          <PortfolioSetupRowWrapper>
            <label>Coin code</label>
            <label>Amount owned</label>
            <label>Purchase price (optional)</label>
          </PortfolioSetupRowWrapper>
          { this.renderInputRows() }
        </CardBody>
      </form>
    );
  }
}

PortfolioSetup.propTypes = {
  currencieCodeNamePairs: PropTypes.array,
  portfolioItems: PropTypes.array,
};

function mapStateToProps(state) {
  const { currencies, portfolio } = state;
  const currencieCodeNamePairs = selectCurrencieCodeNamePairs(currencies);

  const portfolioItems = selectOrderedPortfolioItems(portfolio);
  return {
    currencieCodeNamePairs,
    portfolioItems,
  };
}

export default connect(mapStateToProps)(PortfolioSetup);
