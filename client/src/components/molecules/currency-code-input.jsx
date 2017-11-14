import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import { Div } from 'glamorous';
import { colors } from '../../styles/variables';
import Input from '../atoms/input';

class CurrencyCodeInput extends React.Component {
  constructor(props) {
    super(props);
    this.shouldItemRender = this.shouldItemRender.bind(this);
  }

  static getItemValue(item) {
    return item[0];
  }

  static renderInput(props) {
    const { ref, ...rest } = props;
    return (
      <Input
        css={{ marginBottom: 0 }}
        innerRef={ref}
        {...rest} />
    );
  }

  static getItemDisplayValue(item) {
    if (!item || !item.length) return '';
    return `${item[0]} - ${item[1]}`;
  }

  shouldItemRender(item) {
    const { value } = this.props;
    if (!value) return false;
    return CurrencyCodeInput.getItemDisplayValue(item).toLowerCase().indexOf(value.toLowerCase()) >= 0;
  }

  static renderItem(item, isHighlighted) {
    const css = {
      backgroundColor: isHighlighted ? colors.bloodyRed : 'transparent',
      color: isHighlighted ? colors.paperYellow : 'black',
    };
    return (
      <Div css={ css }>
        {CurrencyCodeInput.getItemDisplayValue(item)}
      </Div>
    );
  }

  render() {
    const { value, name, placeholder = 'BTC', onChange, onSelect, currencieCodeNamePairs } = this.props;
    return (
        <Autocomplete
          getItemValue={CurrencyCodeInput.getItemValue}
          items={currencieCodeNamePairs}
          renderItem={CurrencyCodeInput.renderItem}
          renderInput={CurrencyCodeInput.renderInput}
          inputProps={{ name, placeholder }}
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          shouldItemRender={this.shouldItemRender}
        />
    );
  }
}

CurrencyCodeInput.propTypes = {
  currencieCodeNamePairs: PropTypes.array,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
};

export default CurrencyCodeInput;
