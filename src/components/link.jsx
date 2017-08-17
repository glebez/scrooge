import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import glamorous from 'glamorous';
import { colors } from '../styles/variables';

const WrappedLink = props => <RouterLink {...props} />;
export const glamorousLinkFactory = glamorous(WrappedLink);
const Link = glamorousLinkFactory({
  textDecoration: 'none',
  color: colors.bloodyRed,
  ':hover': {
    color: colors.ketchupRed
  }
})

export default Link;
