import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { logout } from '../../actions';

class Logout extends React.Component {
  componentDidMount() {
    const { dispatch, storageUtils } = this.props;
    dispatch(logout());
    storageUtils.removeUserData();
    return (<Redirect to='/' />);
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func,
  storageUtils: PropTypes.object,
};

export default Logout;
