import { handle } from 'redux-pack';
import Actions from '../actions/const';
import { getUserData } from '../utils/auth';

const initialState = {
  name: null,
  token: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case Actions.SIGNUP:
    case Actions.LOGIN:
      return handle(state, action, {
        success: (prevState) => {
          const { data } = action.payload;
          return getUserData(data) || prevState;
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
