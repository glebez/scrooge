import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import CardContentRow from './card-content-row';
import { colors } from '../styles/variables';

const cardBG = colors.paperYellow;

export const CardBody = glamorous.div({
  gridGap: '15px',
  padding: '20px 25px 20px 45px',
  background: cardBG,
  background: `linear-gradient(135deg, transparent 20px, ${cardBG} 0)`, // eslint-disable-line no-dupe-keys
  borderRadius: '5px ',
});

class Card extends React.Component {
  render() {
    const { dataRows, css } = this.props;
    return (
      <CardBody css={css}>
        {dataRows.map(row => <CardContentRow key={row.mainValue} {...row} />)}
      </CardBody>
    );
  }
}

Card.propTypes = {
  dataRows: PropTypes.array,
  css: PropTypes.object,
};

export default Card;
