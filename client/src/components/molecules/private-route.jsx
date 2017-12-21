import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import routes from '../../routes';

function PrivateRoute({ component: Component, render, predicate, redirectPath = routes.index, ...rest }) {
  function renderRoute(props) {
    if (!predicate) {
      return (
        <Redirect to={{
          pathname: redirectPath,
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
  predicate: PropTypes.bool,
  redirectPath: PropTypes.string,
};

export default PrivateRoute;
