import { assert } from 'chai';
import { LIFECYCLE } from 'redux-pack';
import reducer from '../portfolio.js';
import Actions from '../../actions/const';
import { makePackAction, unknownAction } from '../../utils/tests';

describe('portfolio reducer', () => {
  const initialState = {
    items: null,
    isFetching: false,
    error: null,
    baseCurrency: null,
  };

  it('returns unmodified state on unknown action', () => {
    const result = reducer(initialState, unknownAction);
    assert.deepEqual(result, initialState);
  });

  describe('with FETCH_PORTFOLIO action', () => {
    it('resets the error state on the start of async call', () => {
      const state = Object.assign({}, initialState, { error: 'Big bad error' });
      const action = makePackAction(LIFECYCLE.START, { type: Actions.FETCH_PORTFOLIO });
      const result = reducer(state, action);
      assert.isNull(result.error);
    });

    it('sets the fetching flag to true on the start of async call', () => {
      const action = makePackAction(LIFECYCLE.START, { type: Actions.FETCH_PORTFOLIO });
      const result = reducer(initialState, action);
      assert.isTrue(result.isFetching);
    });

    it('sets the fetching flag to false on the finish of async call', () => {
      const state = Object.assign({}, initialState, { isFetching: true });
      const action = makePackAction(LIFECYCLE.SUCCESS, { type: Actions.FETCH_PORTFOLIO });
      const result = reducer(state, action);
      assert.isFalse(result.isFetching);
    });

    it('sets the error on the failure of async call', () => {
      const payload = {
        data: {
          error: "big bad error",
        },
      };
      const action = makePackAction(LIFECYCLE.FAILURE, { type: Actions.FETCH_PORTFOLIO, payload });
      const result = reducer(initialState, action);
      assert.equal(result.error, "big bad error");
    });

    it('does not modify state if no data is present on the success of async call', () => {
      const payload = {};
      const action = makePackAction(LIFECYCLE.SUCCESS, { type: Actions.FETCH_PORTFOLIO, payload });
      const result = reducer(initialState, action);
      assert.deepEqual(result, initialState);
    });

    it('updates the state with data from successful async call', () => {
      const payload = {
        data: {
          items: [{
            code: 'FOO',
          }],
          totalPurchaseCost: '10000',
          totalPurchaseCurrency: 'RUB',
        },
      };
      const expectedResult = Object.assign({}, initialState, {
        items: {
          FOO: {
            code: 'FOO',
          }
        },
        totalPurchaseCost: '10000',
        totalPurchaseCurrency: 'RUB',
      });
      const action = makePackAction(LIFECYCLE.SUCCESS, { type: Actions.FETCH_PORTFOLIO, payload });
      const result = reducer(initialState, action);
      assert.deepEqual(result, expectedResult);
    });
  });
});
