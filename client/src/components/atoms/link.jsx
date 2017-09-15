import React from 'react';
import { Link as OriginalRouterLink } from 'react-router-dom';
import glamorous from 'glamorous';
import { colors } from '../../styles/variables';

const WrappedLink = props => <OriginalRouterLink {...props} />;
export const glamorousLinkFactory = glamorous(WrappedLink);
const linkStyles = {
  textDecoration: 'none',
  color: colors.bloodyRed,
  ':hover': {
    color: colors.ketchupRed,
  },
};

export const RouterLink = glamorousLinkFactory(linkStyles);
export const Link = glamorous.a(linkStyles);
