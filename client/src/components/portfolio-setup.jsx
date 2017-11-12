import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { CardBody } from './card';
import Input from './atoms/input';
import CurrencyCodeInput from './currency-code-input';


const PortfolioSetupRowWrapper = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '15px',
});

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
  const currencieCodeNamePairs = (
    currencies && currencies.all
    && Object.keys(currencies.all).sort().map(code => [code, currencies.all[code].name])
  ) || [];

  const portfolioItems = portfolio && portfolio.items && portfolio.items.ordered && portfolio.items.all
    && portfolio.items.ordered.map((code) => {
      const { number, purchaseCost } = portfolio.items.all[code];
      return { number, purchaseCost, code };
    });
  return {
    currencieCodeNamePairs,
    portfolioItems,
  };
}

export default connect(mapStateToProps)(PortfolioSetup);

function PortfolioSetupInputRow({ values = {}, currencieCodeNamePairs = [], index, onChange, onAutosuggestSelect }) {
  return (
    <PortfolioSetupRowWrapper>
      <CurrencyCodeInput
        name={`${index}.code`}
        value={values.code}
        onChange={onChange}
        onSelect={onAutosuggestSelect}
        currencieCodeNamePairs={currencieCodeNamePairs} />
      <div>
        <Input
          name={`${index}.number`}
          onChange={onChange}
          placeholder="100"
          value={values.number} />
      </div>
      <div>
        <Input
          name={`${index}.purchaseCost`}
          onChange={onChange}
          placeholder="10000"
          value={values.purchaseCost} />
      </div>
    </PortfolioSetupRowWrapper>
  );
}

PortfolioSetupInputRow.propTypes = {
  values: PropTypes.object,
  currencieCodeNamePairs: PropTypes.array,
  index: PropTypes.number,
  onChange: PropTypes.func,
  onAutosuggestSelect: PropTypes.func,
};
