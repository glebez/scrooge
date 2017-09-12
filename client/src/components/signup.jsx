import React from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'glamorous';
import Input from './atoms/input';
import Container from './atoms/container';
import { signup } from '../actions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    this.props.dispatch(signup(form.email.value, form.password.value, form['confirm-password'].value));
  }

  render() {
    return (
      <Container css={{ paddingTop: '20px' }}>
        <H1 textAlign="center" fontWeight="400" marginBottom="35px">Sign up</H1>
        <form onSubmit={this.handleSubmit}>
          <Input type="email" name="email" placeholder="email" required/>
          <Input type="password" name="password" placeholder="password" required/>
          <Input type="password" name="confirm-password" placeholder="confirm password" required/>
          <Input type="submit" value="Sign up"/>
        </form>
      </Container>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func,
};

export default Signup;
