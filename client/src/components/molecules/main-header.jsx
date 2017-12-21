import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors, mediaQueries } from '../../styles/variables';
import ScroogeLogo from '../../styles/logo.svg';
import { RouterLink } from '../atoms/link';
import Hamburger from '../atoms/hamburger-icon';
import Dropdown from './dropdown';

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
            <RouterLink to="/market">Market</RouterLink>
          </NavItem>
          <NavItem>
            <RouterLink to="/portfolio">Portfolio</RouterLink>
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
              <RouterLink to="/portfolio-setup">Setup Portfolio</RouterLink>
              <RouterLink to="/logout">Log&nbsp;out</RouterLink>
            </Dropdown>
          </NavItem>
        </NavList>
      );
    }
    return (
      <NavList hideOnMobile >
        <NavItem>
          <RouterLink to="/login">Log&nbsp;in</RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink to="/signup">Sign&nbsp;up</RouterLink>
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
                <RouterLink key="/portfolio-setup" to="/portfolio-setup">Setup Portfolio</RouterLink>,
                <RouterLink key="/logout" to="/logout">Log&nbsp;out</RouterLink>
              ]
              : [
                <RouterLink key="/login" to="/login">Log&nbsp;in</RouterLink>,
                <RouterLink key="/signup" to="/signup">Sign&nbsp;up</RouterLink>
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
        <RouterLink to="/">
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
