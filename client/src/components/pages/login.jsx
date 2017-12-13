import React from 'react';
import PropTypes from 'prop-types';
import { H1, Div } from 'glamorous';
import Input from '../atoms/input';
import { RouterLink } from '../atoms/link';
import { login } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const { dispatch, history } = this.props;
    dispatch(login(form.email.value, form.password.value, history));
  }

  render() {
    return (
      <Div css={{ paddingTop: '20px' }}>
        <H1 textAlign="center" fontWeight="400" marginBottom="35px">Login</H1>
        <form onSubmit={this.handleSubmit}>
          <Input type="email" name="email" placeholder="email" required/>
          <Input type="password" name="password" placeholder="password" required/>
          <Input type="submit" value="Login"/>
        </form>
        <Div css={{ textAlign: 'right', fontSize: '14px' }}>
          <RouterLink to="/forgot">Yo, I think I forgot my password...</RouterLink>
        </Div>
      </Div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default Login;
