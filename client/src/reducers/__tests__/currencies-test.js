import { assert } from 'chai';
import { LIFECYCLE } from 'redux-pack';
import reducer from '../currencies';
import Actions from '../../actions/const';
import { makePackAction, unknownAction } from '../../utils/tests';

describe('currencies reducer', () => {
  const initialState = {
    all: null,
    isFetching: false,
    error: null,
  };

  it('returns unmodified state on unknown action', () => {
    const result = reducer(initialState, unknownAction);
    assert.deepEqual(result, initialState);
  });

  describe('with FETCH_CURRENCIES action', () => {
    it('resets the error state on the start of async call', () => {
      const state = Object.assign({}, initialState, { error: 'Big bad error' });
      const action = makePackAction(LIFECYCLE.START, { type: Actions.FETCH_CURRENCIES });
      const result = reducer(state, action);
      assert.isNull(result.error);
    });

    it('sets the fetching flag to true on the start of async call', () => {
      const action = makePackAction(LIFECYCLE.START, { type: Actions.FETCH_CURRENCIES });
      const result = reducer(initialState, action);
      assert.isTrue(result.isFetching);
    });

    it('sets the fetching flag to false on the finish of async call', () => {
      const state = Object.assign({}, initialState, { isFetching: true });
      const action = makePackAction(LIFECYCLE.SUCCESS, { type: Actions.FETCH_CURRENCIES });
      const result = reducer(state, action);
      assert.isFalse(result.isFetching);
    });

    it('sets the error on the failure of async call', () => {
      const payload = {
        data: {
          error: "big bad error",
        },
      };
      const action = makePackAction(LIFECYCLE.FAILURE, { type: Actions.FETCH_CURRENCIES, payload });
      const result = reducer(initialState, action);
      assert.equal(result.error, "big bad error");
    });

    it('updates the state with data from successful async call', () => {
      const payload = {
        data: [
          {
            symbol: 'FOO',
            value: 1,
            bar: 'baz',
          },
          {
            symbol: 'BAR',
            value: 2,
            bar: 'foo',
          }
        ],
      };
      const expectedResult = Object.assign({}, initialState, {
        all: {
          FOO: {
            symbol: 'FOO',
            value: 1,
            bar: 'baz',
          },
          BAR: {
            symbol: 'BAR',
            value: 2,
            bar: 'foo',
          },
        }
      });
      const action = makePackAction(LIFECYCLE.SUCCESS, { type: Actions.FETCH_CURRENCIES, payload });
      const result = reducer(initialState, action);
      assert.deepEqual(result, expectedResult);
    });
  });
});
