import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';


function PrivateRoute({ component: Component, render, token, ...rest }) {
  function renderRoute(props) {
    if (!token) {
      return (
        <Redirect to={{
          pathname: '/login',
        }}/>
      );
    }
    if (Component) {
      return <Component {...props}/>;
    }
    return render(props);
  }

  return (
    <Route {...rest} render={renderRoute}/>
  );
}

PrivateRoute.propTypes = {
  location: PropTypes.string,
  token: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  render: PropTypes.func,
};

export default PrivateRoute;
