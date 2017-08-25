import React from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'glamorous';
import Input from './atoms/input';
import Container from './atoms/container';

function Signup({ handleSubmit }) {
  return (
    <Container css={{ paddingTop: '20px' }}>
      <H1 textAlign="center" fontWeight="400" marginBottom="35px">Sign up</H1>
      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="email"/>
        <Input type="password" name="password" placeholder="password"/>
        <Input type="password" name="confirm-password" placeholder="confirm password"/>
        <Input type="submit" value="Sign up"/>
      </form>
    </Container>
  );
}

Signup.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Signup;
