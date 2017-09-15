import { handle } from 'redux-pack';
import Actions from '../actions/const';

const initialState = {
  name: null,
  token: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case Actions.SIGNUP:
    case Actions.LOGIN:
      return handle(state, action, {
        success: prevState => getUserData(action.payload.data) || prevState,
      });

    case Actions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

function getUserData(data) {
  const { user: name, token } = data || {};
  if (!name || !token) return null;
  return { name, token };
}
