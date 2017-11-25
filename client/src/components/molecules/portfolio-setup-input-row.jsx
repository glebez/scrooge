import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Input from '../atoms/input';
import CurrencyCodeInput from '../molecules/currency-code-input';

export const PortfolioSetupRowWrapper = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '15px',
});

function PortfolioSetupInputRow({
  values = {},
  currencieCodeNamePairs = [],
  index,
  onChange,
  onAutosuggestSelect,
  onBlur,
}) {
  return (
    <PortfolioSetupRowWrapper>
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
  onBlur: PropTypes.func,
};

export default PortfolioSetupInputRow;
