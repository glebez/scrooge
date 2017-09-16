import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors } from '../styles/variables';
import ScroogeLogo from '../styles/logo.svg';
import { RouterLink } from './atoms/link';

const HeaderContainer = glamorous.div({
  marginBottom: '25px',
  padding: '10px 20px',
  backgroundColor: colors.paperYellow,
  display: 'flex',
});

const Logo = glamorous.img({
  height: '50px',
});

const SideBlock = glamorous.div({
  flexGrow: 1,
  flexBasis: '20%',
});

const CenterBlock = glamorous.div({
  flexGrow: 2,
  flexBasis: '60%',
  textAlign: 'center',
});

const NavList = glamorous.ul({
  listStyle: 'none',
  display: 'flex',
});

const NavItem = glamorous.li({
  marginRight: '10px',
});

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.renderNav = this.renderNav.bind(this);
  }

  renderNav() {
    const { username } = this.props;
    if (username) {
      return (
        <NavList>
          <NavItem>
            <RouterLink to="/account">{username}</RouterLink>
          </NavItem>
          <NavItem>
            <RouterLink to="/logout">Log&nbsp;out</RouterLink>
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
        <SideBlock />
        <CenterBlock>
          <RouterLink to="/">
            <Logo src={ScroogeLogo} />
          </RouterLink>
        </CenterBlock>
        <SideBlock>
          <nav>
            {this.renderNav()}
          </nav>
        </SideBlock>
      </HeaderContainer>
    );
  }
}

MainHeader.propTypes = {
  dispatch: PropTypes.func,
  username: PropTypes.string,
};

export default MainHeader;
