import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardBody } from '../molecules/card';
import CoinInputRow, { InputRowWrapper } from '../molecules/coin-input-row';
import {
  selectOrderedPortfolioItems,
  selectTotalPurchaseCost,
  selectTotalPurchaseCurrency,
  selectLastFetched,
} from '../../reducers/portfolio';
import { selectCurrencieCodeNamePairs } from '../../reducers/currencies';
import { selectToken } from '../../reducers/user';
import Button from '../atoms/button';
import Input from '../atoms/input';
import Label from '../atoms/label';
import { savePortfolio } from '../../actions';

class PortfolioSetup extends React.Component {
  constructor(props) {
    super(props);
    this.emptyRow = {
      code: '',
      number: '',
      purchaseCost: '',
    };
    this.state = this.createInitialState(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCoinInputChange = this.handleCoinInputChange.bind(this);
    this.handleAutosuggestSelect = this.handleAutosuggestSelect.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.updateFieldStates = this.updateFieldStates.bind(this);
    this.addRow = this.addRow.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  createInitialState({ portfolioItems, totalPurchaseCost }) {
    const fieldValues = {
      totalPurchaseCost: totalPurchaseCost || '',
      coins: [...(portfolioItems || []), { ...this.emptyRow }],
    };
    const fieldStates = PortfolioSetup.prepareInitialFieldStates(fieldValues);
    return {
      fieldValues,
      fieldStates,
    };
  }

  static prepareInitialFieldStates(fieldValues) {
    if (!fieldValues) return {};
    return Object.keys(fieldValues).reduce(
      (result, key) => {
        const fieldValue = fieldValues[key];
        let fieldState;
        if (Array.isArray(fieldValue)) {
          fieldState = PortfolioSetup.prepareInitialFieldStates(fieldValue);
        } else {
          fieldState = {
            touched: !(fieldValue == null),
            valid: true,
          };
        }
        return {
          ...result,
          [key]: fieldState,
        };
      }, {},
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastFetched !== nextProps.lastFetched) {
      this.setState(this.createInitialState(nextProps));
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      fieldValues: {
        ...this.state.fieldValues,
        [name]: value,
      },
    });
  }

  handleCoinInputChange(e) {
    e.preventDefault();
    const [index, name] = e.target.name.split('.');
    const coins = this.state.fieldValues.coins.slice();
    coins[index] = {
      ...coins[index],
      [name]: e.target.value,
    };
    this.setState({
      fieldValues: {
        ...this.state.fieldValues,
        coins,
      },
    });
  }

  handleInputBlur(e) {
    const [index, name] = e.target.name.split('.');
    this.updateFieldStates(index, name, this.state.fieldValues);
  }

  updateFieldStates(index, name, fieldValues) {
    if (name) {
      const coins = this.state.fieldStates.coins.slice();
      coins[index] = {
        ...coins[index],
        [name]: {
          touched: true,
          valid: this.validateInput(),
        },
      };
      if (parseInt(index, 10) === fieldValues.coins.length - 1) {
        this.addRow(fieldValues);
      }
      this.setState({
        fieldStates: {
          ...this.state.fieldStates,
          coins,
        },
      });
    } else {
      this.setState({
        fieldStates: {
          ...this.state.fieldStates,
          [index]: {
            touched: true,
            valid: this.validateInput(),
          },
        },
      });
    }
  }

  handleAutosuggestSelect(index, value) {
    const fieldValues = this.state.fieldValues.slice();
    fieldValues[index] = {
      ...fieldValues[index],
      code: value,
    };
    this.setState({ fieldValues });
    this.updateFieldStates(index, 'code', fieldValues);
  }

  validateInput() {
    return true;
  }

  addRow(fieldValues = this.state.fieldValues) {
    const updatedValues = {
      ...fieldValues,
      coins: [
        ...fieldValues.coins,
        { ...this.emptyRow },
      ],
    };
    this.setState({ fieldValues: updatedValues });
  }

  renderInputRows() {
    const { currencieCodeNamePairs } = this.props;
    const fieldValues = this.state.fieldValues.coins || [{}];

    return fieldValues.map((item, index) => {
      const boundHandleAutosuggestSelect = value => this.handleAutosuggestSelect(index, value);
      return (
        <CoinInputRow
          key={index}
          index={index}
          currencieCodeNamePairs={currencieCodeNamePairs}
          onChange={this.handleCoinInputChange}
          onBlur={this.handleInputBlur}
          onAutosuggestSelect={boundHandleAutosuggestSelect}
          values={item} />
      );
    });
  }

  onSave() {
    const { dispatch, token, totalPurchaseCurrency } = this.props;
    const { fieldValues: { coins, totalPurchaseCost } } = this.state;
    if (!token) return;
    const portfolio = {
      portfolio: {
        totalPurchaseCurrency,
        totalPurchaseCost,
        items: coins.filter(valueRow => valueRow.code && valueRow.number),
      },
    };
    dispatch(savePortfolio(token, portfolio));
  }

  render() {
    // TODO: add input validation
    const { totalPurchaseCost } = this.state.fieldValues;
    return (
      <form onSubmit={e => e.preventDefault()}>
        <CardBody>
          <InputRowWrapper colNum={2}>
            <Label htmlFor="totalPurchaseCost" verticallyCentered>Total Purchase Cost</Label>
            <Input
              name="totalPurchaseCost"
              value={totalPurchaseCost}
              onChange={this.handleInputChange}
            />
          </InputRowWrapper>
          <InputRowWrapper colNum={3}>
            <Label>Coin code</Label>
            <Label>Amount owned</Label>
            <Label>Purchase cost</Label>
          </InputRowWrapper>
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
  totalPurchaseCost: PropTypes.number,
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
