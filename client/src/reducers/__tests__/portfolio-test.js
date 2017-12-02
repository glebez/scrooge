import { assert } from 'chai';
import { LIFECYCLE } from 'redux-pack';
import sinon from 'sinon';
import reducer, { initialState } from '../portfolio';
import Actions from '../../actions/const';
import { logout } from '../../actions';
import { makePackAction, unknownAction } from '../../utils/tests';

describe('portfolio reducer', () => {

  it('returns unmodified state on unknown action', () => {
    const result = reducer(initialState, unknownAction);
    assert.deepEqual(result, initialState);
  });

  it('resets the state to default on LOGOUT action', () => {
    const state = {
      items: {
        foo: 'bar'
      },
      totalPurchaseCost: 10000,
    };
    const result = reducer(state, logout());
    assert.deepEqual(result, initialState);
  });

  describe('with FETCH_PORTFOLIO action', () => {
    it('resets the error state on the start of async call', () => {
      const state = { ...initialState, error: 'Big bad error' };
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
      const state = { ...initialState, isFetching: true };
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
      const clock = sinon.useFakeTimers({
        now: 1483228800000,
        shouldAdvanceTime: false,
      });
      const payload = {
        data: {
          items: [{
            code: 'FOO',
          },
          {
            code: 'BAR',
          }],
          totalPurchaseCost: '10000',
          totalPurchaseCurrency: 'RUB',
        },
      };
      const expectedResult = {
        ...initialState,
        items: {
          all: {
            FOO: {
              code: 'FOO',
            },
            BAR: {
              code: 'BAR',
            },
          },
          ordered: ['FOO', 'BAR'],
        },
        totalPurchaseCost: '10000',
        totalPurchaseCurrency: 'RUB',
        lastFetched: 1483228800000,
      };
      const action = makePackAction(LIFECYCLE.SUCCESS, { type: Actions.FETCH_PORTFOLIO, payload });
      const result = reducer(initialState, action);
      assert.deepEqual(result, expectedResult);
      clock.restore();
    });
  });
});
