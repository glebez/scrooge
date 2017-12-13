import React from 'react';
import PropTypes from 'prop-types';
import { H1, Div } from 'glamorous';
import Input from '../atoms/input';
import { requestPasswordReset } from '../../actions';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const { dispatch } = this.props;
    dispatch(requestPasswordReset(form.email.value));
  }

  render() {
    return (
      <Div css={{ paddingTop: '20px' }}>
        <H1 textAlign="center" fontWeight="400" marginBottom="35px">Password Reset</H1>
        <form onSubmit={this.handleSubmit}>
          <Input type="email" name="email" placeholder="email" required/>
          <Input type="submit" value="Do it"/>
        </form>
      </Div>
    );
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func,
};

export default ForgotPassword;
