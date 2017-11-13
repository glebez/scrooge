import React from 'react';
import glamorous, { Div, Span } from 'glamorous';
import PropTypes from 'prop-types';
import Card from './card';

const mr10 = { marginRight: '10px' };

const ItemHeading = glamorous.h1({
  marginBottom: '5px',
  fontSize: '36px',
  fontWeight: 'normal',
});

class PortfolioItem extends React.Component {
  render() {
    const { name, symbol, rank, ...cardProps } = this.props;
    return (
      <Div marginBottom='35px'>
        <Div display="flex" alignItems="baseline">
          <ItemHeading css={mr10}>{name}</ItemHeading>
          <Span css={mr10}>{symbol}</Span>
          <Span css={mr10}>{`#${rank}`}</Span>
        </Div>
        <Card key={symbol} valueSize="big" dataRows={[cardProps]} />
      </Div>
    );
  }
}

PortfolioItem.propTypes = {
  diffs: PropTypes.array,
  mainLabel: PropTypes.string,
  mainValue: PropTypes.number,
  valueCurrency: PropTypes.string,
  valueSize: PropTypes.string,
  name: PropTypes.string,
  symbol: PropTypes.string,
  rank: PropTypes.string,
};

export default PortfolioItem;
