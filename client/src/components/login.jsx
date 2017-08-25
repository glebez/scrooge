import React from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'glamorous';
import Input from './atoms/input';
import Container from './atoms/container';

function Login({ handleSubmit }) {
  return (
    <Container css={{ paddingTop: '20px' }}>
      <H1 textAlign="center" fontWeight="400" marginBottom="35px">Login</H1>
      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="email"/>
        <Input type="password" name="password" placeholder="password"/>
        <Input type="submit" value="Login"/>
      </form>
    </Container>
  );
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Login;
