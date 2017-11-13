import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors } from '../../styles/variables';

const VerticalDiffContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'center',
});

const DiffNumber = glamorous.p({
  fontSize: '24px',
}, ({ negative }) => ({
  color: negative ? colors.rottenRed : colors.cashGreen,
}), ({ valueLineHeight = 1 }) => ({
  lineHeight: valueLineHeight,
}));

function isNegative(input) {
  return input && parseFloat(input) < 0;
}

function VerticalDiff({ label, value, valueLineHeight }) {
  return (
    <VerticalDiffContainer>
      <p>{label}</p>
      <DiffNumber negative={isNegative(value)} valueLineHeight={valueLineHeight}>
        {value}
      </DiffNumber>
    </VerticalDiffContainer>
  );
}

VerticalDiff.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  valueLineHeight: PropTypes.string,
};

export default VerticalDiff;
