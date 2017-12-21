import React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../styles/variables';

const Bar = glamorous.div({
  width: '28px',
  height: '3px',
  backgroundColor: colors.bloodyRed,
  ':not(:last-child)': {
    marginBottom: '5px',
  },
});

function HamburgerIcon() {
  return (
    <div>
      <Bar />
      <Bar />
      <Bar />
    </div>
  );
}

export default HamburgerIcon;
