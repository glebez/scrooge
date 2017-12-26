import { handle } from 'redux-pack';
import Actions from '../actions/const';
import { getUserData, getErrorMessage } from '../utils/auth';

const initialState = {
  name: null,
  token: null,
  error: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case Actions.DISMISS_ERROR: {
      const { type } = action.payload;
      if (type === 'all') {
        return {
          ...state,
          error: [],
        };
      } else if (type === 'user') {
        return {
          ...state,
          error: state.error.filter((err, i) => i !== action.payload.index),
        };
      }
      return state;
    }
    case Actions.SIGNUP:
    case Actions.LOGIN:
      return handle(state, action, {
        failure: prevState => ({
          ...prevState,
          ...getErrorMessage(action.payload),
        }),
        success: (prevState) => {
          const userData = getUserData(action.payload);
          return userData ? { ...userData, error: [] } : prevState;
        },
      });
    case Actions.SET_USER: {
      const { name, token } = action.payload;
      return { name, token };
    }
    case Actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function selectToken(state) {
  return state && state.token;
}

export function selectName(state) {
  return state && state.name;
}

export function selectError(state) {
  return state && state.error;
}
