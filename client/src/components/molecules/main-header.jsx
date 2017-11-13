import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { colors } from '../../styles/variables';
import ScroogeLogo from '../../styles/logo.svg';
import { RouterLink } from '../atoms/link';

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
  justifyContent: 'flex-end',
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
        <div></div>
        <RouterLink to="/">
          <Logo src={ScroogeLogo} />
        </RouterLink>
        <div>
          <nav>
            {this.renderNav()}
          </nav>
        </div>
      </HeaderContainer>
    );
  }
}

MainHeader.propTypes = {
  dispatch: PropTypes.func,
  username: PropTypes.string,
};

export default MainHeader;
