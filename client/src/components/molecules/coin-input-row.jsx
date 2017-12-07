import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Input from '../atoms/input';
import CurrencyCodeInput from '../molecules/currency-code-input';

function generateColumns(colNum) {
  return Array(colNum).fill('1fr').join(' ');
}

export const InputRowWrapper = glamorous.div({
  display: 'grid',
  gridGap: '15px',
},
({ colNum }) => ({
  gridTemplateColumns: generateColumns(colNum),
}),
);

function CoinInputRow({
  values = {},
  currencieCodeNamePairs = [],
  index,
  onChange,
  onAutosuggestSelect,
  onBlur,
}) {
  return (
    <InputRowWrapper colNum={3}>
      <CurrencyCodeInput
        name={`${index}.code`}
        value={values.code}
        onChange={onChange}
        onBlur={onBlur}
        onSelect={onAutosuggestSelect}
        currencieCodeNamePairs={currencieCodeNamePairs} />
      <div>
        <Input
          name={`${index}.number`}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="100"
          value={values.number} />
      </div>
      <div>
        <Input
          name={`${index}.purchaseCost`}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="10000 (optional)"
          value={values.purchaseCost} />
      </div>
    </InputRowWrapper>
  );
}

CoinInputRow.propTypes = {
  values: PropTypes.object,
  currencieCodeNamePairs: PropTypes.array,
  index: PropTypes.number,
  onChange: PropTypes.func,
  onAutosuggestSelect: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CoinInputRow;
