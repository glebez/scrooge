import React from 'react';
import glamorous, { Div } from 'glamorous';
import { colors } from '../styles/variables';
import { textCenter } from '../styles/utils';
import ScroogeLogo from '../styles/logo.svg';

const HeaderContainer = glamorous.div({
  marginBottom: '25px',
  padding: '10px 20px',
  backgroundColor: colors.paperYellow
});

const Logo = glamorous.img({
  height: '50px'
});

export default class MainHeader extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <Div className={textCenter}>
          <Logo src={ScroogeLogo} />
        </Div>
      </HeaderContainer>
    );
  }
}
