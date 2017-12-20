import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors } from '../../styles/variables';
import ScroogeLogo from '../../styles/logo.svg';
import { RouterLink } from '../atoms/link';
import Dropdown from './dropdown';

const LOGO_WIDTH = '60px';

const HeaderContainer = glamorous.div({
  marginBottom: '25px',
  padding: '10px 20px',
  backgroundColor: colors.paperYellow,
  display: 'grid',
  gridTemplateColumns: `1fr ${LOGO_WIDTH} 1fr`,
});

const Logo = glamorous.img({
  height: '50px',
});

const NavList = glamorous.ul({
  listStyle: 'none',
  display: 'flex',
  paddingLeft: 0,
},
({ alignment = 'right' }) => ({
  justifyContent: alignment === 'right' ? 'flex-end' : 'felx-start',
}),
);

const NavItem = glamorous.li({
  marginRight: '10px',
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
        <NavList alignment="left">
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
        <NavList>
          <NavItem>
            <Dropdown linkText={username}>
              <RouterLink to="/portfolio-setup">Setup Portfolio</RouterLink>
              <RouterLink to="/logout">Log&nbsp;out</RouterLink>
            </Dropdown>
          </NavItem>
        </NavList>
      );
    }
    return (
      <NavList>
        <NavItem>
          <RouterLink to="/login">Log&nbsp;in</RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink to="/signup">Sign&nbsp;up</RouterLink>
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
