import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { mediaQueries } from '../../styles/variables';

const Container = glamorous.div({
  display: 'flex',
},
({ alignment = {} }) => {
  const { desktop = 'vertical', phone = 'vertical' } = alignment;
  let styles = {
    flexDirection: 'column',
    [mediaQueries.phone]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  };
  if (desktop !== 'vertical') {
    styles = {
      ...styles,
      flexDirection: 'row',
    };
  }
  if (phone !== 'vertical') {
    styles = {
      ...styles,
      [mediaQueries.phone]: {
        flexDirection: 'row',
      },
    };
  }
  return styles;
});

const Label = glamorous.label(
  ({ alignment = {} }) => {
    const { desktop = 'vertical', phone = 'vertical' } = alignment;
    let styles = {
      marginBottom: '10px',
      [mediaQueries.phone]: {
        marginBottom: '10px',
      },
    }
    if (desktop !== 'vertical') {
      styles = {
        ...styles,
        marginRight: '25px',
      };
    }
    if (phone !== 'vertical') {
      styles = {
        ...styles,
        [mediaQueries.phone]: {
          marginBottom: 0,
          marginRight: '25px',
        },
      };
    }
    return styles;
  }
);

function LabeledItem({ children, label, css, alignment }) {
  return (
    <Container css={css} alignment={alignment}>
      <Label alignment={alignment}>{label}</Label>
      {children}
    </Container>
  );
}

LabeledItem.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  css: PropTypes.object,
  alignment: PropTypes.object,
};

export default LabeledItem;
