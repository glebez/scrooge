import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors } from '../styles/variables';

import VerticalDiff from './vertical-diff';

const cardBG = colors.paperYellow;

const CardBody = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gridGap: '15px',
  padding: '20px 25px 20px 45px',
  background: cardBG,
  background: `linear-gradient(135deg, transparent 20px, ${cardBG} 0)`, // eslint-disable-line no-dupe-keys
  borderRadius: '5px ',
});

const CardValue = glamorous.p({
  margin: 0,
  whiteSpace: 'nowrap',
}, ({ size = 'regular' }) => ({
  fontSize: size === 'big' ? '36px' : '18px',
}));

const Diffs = glamorous.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, auto))',
});

class Card extends React.Component {
  render() {
    const { diffs, mainLabel, mainValue, valueCurrency, valueSize } = this.props;
    return (
      <CardBody>
        <div>
          <p>{mainLabel}</p>
          <CardValue size={valueSize}>
            { `${mainValue.toFixed(3)} ${valueCurrency}` }
          </CardValue>
        </div>
        <Diffs>
          { diffs.map(diff => (<VerticalDiff key={diff.label} label={diff.label} value={diff.value} />)) }
        </Diffs>
      </CardBody>
    );
  }
}

Card.propTypes = {
  diffs: PropTypes.array,
  mainLabel: PropTypes.string,
  mainValue: PropTypes.number,
  valueCurrency: PropTypes.string,
  valueSize: PropTypes.string,
};

export default Card;
