import React from 'react';
import glamorous, {Div} from 'glamorous';

import { colors } from '../styles/variables';

const cardBG = colors.paperYellow;

const CardContainer = glamorous.div({
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


class CurrencyCard extends React.Component {
  render() {
    const {
      name,
      price_eur,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d
    } = this.props.currency;
    return (
      <Div marginBottom='45px'>
        <CardHeading>{name}</CardHeading>
        <CardContainer>
          <Div display="flex" textAlign="center" justifyContent="space-between">
            <div>
              <p>Value</p>
              <p>{parseFloat(price_eur).toFixed(3) + ' EUR'}</p>
            </div>
            <Div display="flex" flexBasis="60%" justifyContent="space-around">
              <div>
                <p>1h</p>
                <p>{percent_change_1h}</p>
              </div>
              <div>
                <p>24h</p>
                <p>{percent_change_24h}</p>
              </div>
              <div>
                <p>7d</p>
                <p>{percent_change_7d}</p>
              </div>
            </Div>
          </Div>
        </CardContainer>
      </Div>
    );
  }
}

export default CurrencyCard;
