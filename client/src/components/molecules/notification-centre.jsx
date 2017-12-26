import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import Notification from './notification';
import { selectError } from '../../reducers/user';
import { dismissError } from '../../actions';

const NotificationCentreContainer = glamorous.div({
  position: 'absolute',
  width: '100%',
  top: '10px',
  left: '0',
  zIndex: '100',
});

class NotificationCentre extends React.Component {
  render() {
    const { errors, onNotificationDismiss } = this.props;
    return (
      <NotificationCentreContainer>
      {
        errors.filter(err => err.message).map(err => (
          <Notification key={err.message} type="error" onDismiss={onNotificationDismiss.bind(null, err.type, err.index)}>
            {err.message}
          </Notification>
        ))
      }
      </NotificationCentreContainer>
    );
  }
}

NotificationCentre.propTypes = {
  errors: PropTypes.array,
  onNotificationDismiss: PropTypes.func,
};

function mapStateToProps({ user }) {
  const userErrors = selectError(user) || [];
  const errors = [
    ...userErrors.map((err, index) => ({ message: err, index, type: 'user' })),
  ];
  return { errors };
}

function mapDispatchToProps(dispatch) {
  return {
    onNotificationDismiss: function onNotificationDismiss(type, i) {
      dispatch(dismissError(type, i));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCentre);
