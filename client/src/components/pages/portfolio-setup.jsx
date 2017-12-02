import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardBody } from '../molecules/card';
import PortfolioSetupInputRow, { PortfolioSetupRowWrapper } from '../molecules/portfolio-setup-input-row';
import {
  selectOrderedPortfolioItems,
  selectTotalPurchaseCost,
  selectTotalPurchaseCurrency,
  selectLastFetched,
} from '../../reducers/portfolio';
import { selectCurrencieCodeNamePairs } from '../../reducers/currencies';
import { selectToken } from '../../reducers/user';
import Button from '../atoms/button';
import { savePortfolio } from '../../actions';

class PortfolioSetup extends React.Component {
  constructor(props) {
    super(props);
    this.emptyRow = {
      code: '',
      number: '',
      purchaseCost: '',
    };
    this.state = this.createInitialState(props.portfolioItems);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAutosuggestSelect = this.handleAutosuggestSelect.bind(this);
    this.addRow = this.addRow.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.updateFieldStates = this.updateFieldStates.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  createInitialState(portfolioItems) {
    return {
      values: [...(portfolioItems || []), { ...this.emptyRow }],
      fieldStates: PortfolioSetup.prepareInitialFieldStates(portfolioItems),
    };
  }

  static prepareInitialFieldStates(fieldValues) {
    if (!fieldValues) return [];
    return fieldValues.map(value =>
      Object.keys(value).reduce(
        (result, key) => ({
          ...result,
          [key]: {
            touched: !(value[key] == null),
            valid: true,
          },
        }), {},
      ),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastFetched !== nextProps.lastFetched) {
      this.initialPortfolioItems = nextProps.portfolioItems;
      this.setState(this.createInitialState(nextProps.portfolioItems));
    }
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

  handleInputBlur(e) {
    const [index, name] = e.target.name.split('.');
    this.updateFieldStates(index, name, this.state.values);
  }

  updateFieldStates(index, name, values) {
    const fieldStates = this.state.fieldStates.slice();
    fieldStates[index] = {
      ...fieldStates[index],
      [name]: {
        touched: true,
        valid: this.validateInput(),
      },
    };
    if (parseInt(index, 10) === values.length - 1) {
      this.addRow(values);
    }
    this.setState({ fieldStates });
  }

  handleAutosuggestSelect(index, value) {
    const values = this.state.values.slice();
    values[index] = {
      ...values[index],
      code: value,
    };
    this.setState({ values });
    this.updateFieldStates(index, 'code', values);
  }

  validateInput() {
    return true;
  }

  addRow(values = this.state.values) {
    const updatedValues = [
      ...values,
      { ...this.emptyRow },
    ];
    this.setState({ values: updatedValues });
  }

  renderInputRows() {
    const { currencieCodeNamePairs } = this.props;
    const values = this.state.values || [{}];

    return values.map((item, index) => {
      const boundHandleAutosuggestSelect = value => this.handleAutosuggestSelect(index, value);
      return (
        <PortfolioSetupInputRow
          key={index}
          index={index}
          currencieCodeNamePairs={currencieCodeNamePairs}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onAutosuggestSelect={boundHandleAutosuggestSelect}
          values={item} />
      );
    });
  }

  onSave() {
    const { dispatch, token, totalPurchaseCost, totalPurchaseCurrency } = this.props;
    const { values } = this.state;
    if (!token) return;
    const portfolio = {
      portfolio: {
        totalPurchaseCost,
        totalPurchaseCurrency,
        items: values.filter(valueRow => valueRow.code && valueRow.number),
      },
    };
    dispatch(savePortfolio(token, portfolio));
  }

  render() {
    // TODO: add input validation
    return (
      <form onSubmit={e => e.preventDefault()}>
        <CardBody>
          <PortfolioSetupRowWrapper>
            <label>Coin code</label>
            <label>Amount owned</label>
            <label>Purchase price (optional)</label>
          </PortfolioSetupRowWrapper>
          { this.renderInputRows() }
          <Button onClick={this.onSave}>Save</Button>
        </CardBody>
      </form>
    );
  }
}

PortfolioSetup.propTypes = {
  currencieCodeNamePairs: PropTypes.array,
  portfolioItems: PropTypes.array,
  token: PropTypes.string,
  dispatch: PropTypes.func,
  totalPurchaseCost: PropTypes.string,
  totalPurchaseCurrency: PropTypes.string,
  lastFetched: PropTypes.number,
};

function mapStateToProps(state) {
  const { currencies, portfolio, user } = state;
  const currencieCodeNamePairs = selectCurrencieCodeNamePairs(currencies);

  const portfolioItems = selectOrderedPortfolioItems(portfolio);
  const totalPurchaseCost = selectTotalPurchaseCost(portfolio);
  const totalPurchaseCurrency = selectTotalPurchaseCurrency(portfolio);
  const lastFetched = selectLastFetched(portfolio);
  const token = selectToken(user);
  return {
    currencieCodeNamePairs,
    portfolioItems,
    token,
    totalPurchaseCost,
    totalPurchaseCurrency,
    lastFetched,
  };
}

export default connect(mapStateToProps)(PortfolioSetup);
