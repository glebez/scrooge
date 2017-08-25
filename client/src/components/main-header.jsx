import React from 'react';
import glamorous from 'glamorous';
import { colors } from '../styles/variables';
import ScroogeLogo from '../styles/logo.svg';
import Link from './atoms/link';

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

export default function MainHeader() {
  return (
    <HeaderContainer>
      <SideBlock />
      <CenterBlock>
        <Link to="/">
          <Logo src={ScroogeLogo} />
        </Link>
      </CenterBlock>
      <SideBlock>
        <nav>
          <NavList>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/signup">Signup</Link>
            </NavItem>
          </NavList>
        </nav>
      </SideBlock>
    </HeaderContainer>
  );
}
