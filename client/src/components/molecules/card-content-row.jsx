import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import LabeledItem from '../atoms/labeled-item';
import VerticalDiff from './vertical-diff';
import { mediaQueries } from '../../styles/variables';

const CardContentRowWrapper = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  '&:not(:first-child)': {
    marginTop: '20px',
  },
  [mediaQueries.phone]: {
    gridTemplateColumns: '1fr',
    gridColumnGap: '20px',
  },
});

const CardContentValue = glamorous.p({
  margin: 0,
  whiteSpace: 'nowrap',
}, ({ size = 'regular' }) => ({
  fontSize: size === 'big' ? '36px' : '24px',
  lineHeight: size === 'big' ? '42px' : '28px',
}));

const Diffs = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& div': {
    flexBasis: '33%',
  },
  [mediaQueries.phone]: {
    justifyContent: 'space-between',
  },
});

const labeledItemCss = {
  [mediaQueries.phone]: {
    marginBottom: '20px',
  },
};

function CardContentRow({ diffs, mainLabel, mainValue, valueCurrency, valueSize }) {
  return (
    <CardContentRowWrapper>
      <LabeledItem label={mainLabel} css={labeledItemCss}>
        <CardContentValue size={valueSize}>
          { `${mainValue.toFixed(3)} ${valueCurrency}` }
        </CardContentValue>
      </LabeledItem>
      <Diffs itemsCount={diffs && diffs.length}>
        { diffs.map(diff => (
          <VerticalDiff
            key={diff.label}
            label={diff.label}
            value={diff.value}
            valueLineHeight={valueSize === 'big' ? '42px' : '28px'}
          />))
        }
      </Diffs>
    </CardContentRowWrapper>
  );
}

CardContentRow.propTypes = {
  diffs: PropTypes.array,
  mainLabel: PropTypes.string,
  mainValue: PropTypes.number,
  valueCurrency: PropTypes.string,
  valueSize: PropTypes.string,
};

export default CardContentRow;
