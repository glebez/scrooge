import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors, mediaQueries } from '../../styles/variables';
import ScroogeLogo from '../../styles/logo.svg';
import { RouterLink } from '../atoms/link';
import Hamburger from '../atoms/hamburger-icon';
import Dropdown from './dropdown';
import routes from '../../routes';

const LOGO_WIDTH = '60px';

const HeaderContainer = glamorous.div({
  marginBottom: '25px',
  padding: '10px 20px',
  backgroundColor: colors.paperYellow,
  display: 'grid',
  gridTemplateColumns: `1fr ${LOGO_WIDTH} 1fr`,
  alignItems: 'center',
});

const Logo = glamorous.img({
  height: '50px',
  [mediaQueries.phone]: {
    height: '35px',
  },
});

const NavList = glamorous.ul({
  listStyle: 'none',
  display: 'flex',
  paddingLeft: 0,
  margin: 0,
},
({ alignment = 'right' }) => ({
  justifyContent: alignment === 'right' ? 'flex-end' : 'felx-start',
}),
({ hideOnMobile = false }) => ({
  [mediaQueries.phone]: {
    display: hideOnMobile ? 'none' : 'flex',
  },
}),
({ hideOnDesktop = false }) => ({
  [mediaQueries.desktop]: {
    display: hideOnDesktop ? 'none' : 'flex',
  },
}),
);

const NavItem = glamorous.li({
  ':not(:last-child)': {
    marginRight: '15px',
  },
});

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.renderNav = this.renderNav.bind(this);
    this.renderAuthNav = this.renderAuthNav.bind(this);
  }

  renderNav() {
    const { username } = this.props;
    if (username) {
      return (
        <NavList alignment="left" hideOnMobile >
          <NavItem>
            <RouterLink to={routes.market}>Market</RouterLink>
          </NavItem>
          <NavItem>
            <RouterLink to={routes.portfolio}>Portfolio</RouterLink>
          </NavItem>
        </NavList>
      );
    }
    return null;
  }

  renderAuthNav() {
    const { username } = this.props;
    if (username) {
      return (
        <NavList hideOnMobile >
          <NavItem>
            <Dropdown linkContents={username}>
              <RouterLink to={routes.portfolioSetup}>Setup Portfolio</RouterLink>
              <RouterLink to={routes.logout}>Log&nbsp;out</RouterLink>
            </Dropdown>
          </NavItem>
        </NavList>
      );
    }
    return (
      <NavList hideOnMobile >
        <NavItem>
          <RouterLink to={routes.login}>Log&nbsp;in</RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink to={routes.signup}>Sign&nbsp;up</RouterLink>
        </NavItem>
      </NavList>
    );
  }

  renderMobileNav() {
    const { username } = this.props;
    return (
      <NavList hideOnDesktop >
        <NavItem>
          <Dropdown linkContents={<Hamburger />}>
            {username ?
              [
                <RouterLink key={routes.portfolio} to={routes.portfolio}>Portfolio</RouterLink>,
                <RouterLink key={routes.market} to={routes.market}>Market</RouterLink>,
                <RouterLink key={routes.portfolioSetup} to={routes.portfolioSetup}>Setup Portfolio</RouterLink>,
                <RouterLink key={routes.logout} to={routes.logout}>Log&nbsp;out</RouterLink>,
              ]
              : [
                <RouterLink key={routes.login} to={routes.login}>Log&nbsp;in</RouterLink>,
                <RouterLink key={routes.signup} to={routes.signup}>Sign&nbsp;up</RouterLink>,
              ]
            }
          </Dropdown>
        </NavItem>
      </NavList>
    );
  }

  render() {
    return (
      <HeaderContainer>
        <nav>
          {this.renderNav()}
        </nav>
        <RouterLink to={routes.index} css={{ textAlign: 'center' }}>
          <Logo src={ScroogeLogo} />
        </RouterLink>
        <nav>
          {this.renderAuthNav()}
          {this.renderMobileNav()}
        </nav>
      </HeaderContainer>
    );
  }
}

MainHeader.propTypes = {
  dispatch: PropTypes.func,
  username: PropTypes.string,
};

export default MainHeader;
