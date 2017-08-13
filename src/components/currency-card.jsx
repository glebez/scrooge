import React from 'react';
import glamorous, {Div, Span} from 'glamorous';
import { colors } from '../styles/variables';

import VerticalDiff from './vertical-diff';

const cardBG = colors.paperYellow;

const CardBody = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px 45px',
  background: cardBG,
  background: `linear-gradient(135deg, transparent 20px, ${cardBG} 0)`,
  borderRadius: '5px '
});

const CardHeading = glamorous.h1({
  marginBottom: '5px',
  fontSize: '36px',
  fontWeight: 'normal'
});

const CardValue = glamorous.p({
  margin: 0
}, ({size = 'regular'}) => ({
  fontSize: size === 'big' ? '36px' : '18px'
}));

const mr10 = { marginRight: '10px'};

class CurrencyCard extends React.Component {
  render() {
    const { number, currency } = this.props;
    const {
      name,
      symbol,
      rank,
      price_eur,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d
    } = currency;

    const mainLabel = number ? 'Value' : 'Value per coin';
    const coinValue = parseFloat(price_eur);
    const totalValue = number ? number * coinValue : coinValue;
    return (
      <Div marginBottom='45px'>
        <Div display="flex" alignItems="baseline">
          <CardHeading css={mr10}>{name}</CardHeading>
          <Span css={mr10}>{symbol}</Span>
          <Span css={mr10}>{'#' + rank}</Span>
        </Div>
        <CardBody>
          <div>
            <p>{mainLabel}</p>
            <CardValue size="big">{parseFloat(totalValue).toFixed(3) + ' EUR'}</CardValue>
          </div>
          <Div display="flex" flexBasis="60%" justifyContent="space-around">
            <VerticalDiff
              label="1h"
              value={percent_change_1h}
            />
            <VerticalDiff
              label="24h"
              value={percent_change_24h}
            />
            <VerticalDiff
              label="7d"
              value={percent_change_7d}
            />
          </Div>
        </CardBody>
      </Div>
    );
  }
}

export default CurrencyCard;
