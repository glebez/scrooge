import React from 'react';
import glamorous from 'glamorous';
import { colors } from '../styles/variables';

const VerticalDiffContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'center'
});

const DiffNumber = glamorous.p({
  fontSize: '24px'
}, ({negative}) => ({
  color: negative ? colors.cashGreen : colors.rottenRed
}));


export default function VerticalDiff({label, value}) {
  return (
    <VerticalDiffContainer>
      <p>{label}</p>
      <DiffNumber negative={value && value.startsWith("-")}>
        {value}
      </DiffNumber>
    </VerticalDiffContainer>
  );
}
