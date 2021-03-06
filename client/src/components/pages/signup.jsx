import React from 'react';
import PropTypes from 'prop-types';
import { H1, Div } from 'glamorous';
import Input from '../atoms/input';
import { signup } from '../../actions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const { dispatch, history } = this.props;
    dispatch(signup(
      form.email.value,
      form.password.value,
      form['confirm-password'].value,
      history,
    ));
  }

  render() {
    return (
      <Div css={{ paddingTop: '20px' }}>
        <H1 textAlign="center" fontWeight="400" marginBottom="35px">Sign up</H1>
        <form onSubmit={this.handleSubmit}>
          <Input type="email" name="email" placeholder="email" required/>
          <Input type="password" name="password" placeholder="password" required/>
          <Input type="password" name="confirm-password" placeholder="confirm password" required/>
          <Input type="submit" value="Sign up"/>
        </form>
      </Div>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default Signup;
