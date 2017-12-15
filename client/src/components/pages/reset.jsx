import React from 'react';
import PropTypes from 'prop-types';
import { H1, Div } from 'glamorous';
import Input from '../atoms/input';
import { resetPassword } from '../../actions';

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const { dispatch, match: { params: { resetToken } = {} } = {} } = this.props;
    dispatch(resetPassword(
      form.password.value,
      form['confirm-password'].value,
      resetToken,
    ));
  }

  render() {
    return (
      <Div css={{ paddingTop: '20px' }}>
        <H1 textAlign="center" fontWeight="400" marginBottom="35px">Set new password</H1>
        <form onSubmit={this.handleSubmit}>
          <Input type="password" name="password" placeholder="password" required/>
          <Input type="password" name="confirm-password" placeholder="confirm password" required/>
          <Input type="submit" value="Do it"/>
        </form>
      </Div>
    );
  }
}

Reset.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default Reset;
