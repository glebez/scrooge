import { assert } from 'chai';
import { LIFECYCLE } from 'redux-pack';
import reducer from '../user.js';
import Actions from '../../actions/const';
import { logout } from '../../actions';
import { makePackAction, unknownAction } from '../../utils/tests';

describe('user reducer', () => {
  const initialState = {
    name: null,
    token: null,
    error: null,
  };

  it('returns unmodified state on unknown action', () => {
    const result = reducer(initialState, unknownAction);
    assert.deepEqual(result, initialState);
  });

  it('resets the state to default on LOGOUT action', () => {
    const state = {
      name: 'foo',
      token: 'bar',
    };
    const result = reducer(state, logout());
    assert.deepEqual(result, initialState);
  });

  describe('on LOGIN action', createAuthTestHandler(Actions.LOGIN));
  describe('on SIGNUP action', createAuthTestHandler(Actions.SIGNUP));

  function createAuthTestHandler(actionType) {
    return function authTestHandler() {
      describe('with succeeded promise', () => {
        it('sets name and token if result contains proper data', () => {
          const payload = {
            data: {
              user: 'foo',
              token: 'bar',
            },
          };
          const action = makePackAction(LIFECYCLE.SUCCESS, { type: actionType, payload });
          const expectedState = {
            name: 'foo',
            token: 'bar',
            error: null,
          };
          const result = reducer(initialState, action);
          assert.deepEqual(result, expectedState);
        });

        it('returns unmodified state if result does not contain proper data', () => {
          const payload = {
            data: {
              foo: 'bar',
            },
          };
          const action = makePackAction(LIFECYCLE.SUCCESS, { type: actionType, payload });
          const result = reducer(initialState, action);
          assert.deepEqual(result, initialState);
        });
      });

      it('with failed promise returns state with an error', () => {
        const action = makePackAction(LIFECYCLE.FAILURE,
          {
            type: actionType,
            payload: {
              response: {
                data: {
                  message: 'Yo, stuff is on fire.'
                }
              }
            }
          });
        const result = reducer(initialState, action);
        const expectedState = {
          ...initialState,
          error: 'Yo, stuff is on fire.',
        };
        assert.deepEqual(result, expectedState);
      });
    }
  }
});
