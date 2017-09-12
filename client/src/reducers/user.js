import { handle } from 'redux-pack';
import Actions from '../actions/const';

export default function user(state = {}, action) {
  switch (action.type) {
    case Actions.SIGNUP:
      return handle(state, action, {
        start: (prevState) => {
          console.log('Signing up');
          return prevState;
        },
        finish: (prevState) => {
          console.log('Finished!', action.payload);
          return prevState;
        },
        failure: prevState => prevState,
        success: prevState => prevState,
      });

    default:
      return state;
  }
}
