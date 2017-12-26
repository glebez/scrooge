import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { colors } from '../../styles/variables';

const NotificationBody = glamorous.div({
  position: 'relative',
  marginBottom: '10px',
  borderRadius: '5px',
  padding: '20px 25px',
  color: colors.paperYellow,
},
({ type }) => ({
  backgroundColor: type === 'error' ? colors.ketchupRed : colors.moscowSky,
}),
);

const NotificationCloseBtn = glamorous.button({
  position: 'absolute',
  top: '5px',
  right: '10px',
  fontSize: '20px',
  color: 'inherit',
  background: 'none',
  border: 'none',
});

function Notification({ children, onDismiss, type }) {
  return (<NotificationBody type={type}>
    <NotificationCloseBtn onClick={onDismiss}>&times;</NotificationCloseBtn>
    {children}
  </NotificationBody>);
}

Notification.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  onDismiss: PropTypes.func,
};

export default Notification;
