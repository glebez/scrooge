import { assert } from 'chai';
import sinon from 'sinon';
import { createStorageUtils, getUserData } from '../auth';


describe('auth utils', () => {
  describe('storage utils', () => {
    const storage = {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    };
    const storageUtils = createStorageUtils(storage);
    let setItem = sinon.spy(storage, 'setItem');
    let getItem = sinon.stub(storage, 'getItem');
    let removeItem = sinon.spy(storage, 'removeItem');

    afterEach(() => {
      getItem.reset();
      setItem.reset();
      removeItem.reset();
    });

    after(() => {
      getItem.restore();
      setItem.restore();
      removeItem.restore();
    });

    describe('storeUserData util', () => {
      it('checks the storage for existing credentials', () => {
        storageUtils.storeUserData('bob', 'hope');
        assert.isTrue(getItem.calledOnce);
      });

      it('does not store new values if the record is present already', () => {
        getItem = getItem.callsFake(() => true);
        storageUtils.storeUserData('bob', 'hope');
        assert.isTrue(setItem.notCalled);
      });

      it('does not store new values if the one of credentials is missing', () => {
        getItem = getItem.callsFake(() => true);
        storageUtils.storeUserData('bob');
        assert.isTrue(setItem.notCalled);
      });

      it('stores values', () => {
        getItem = getItem.callsFake(() => false);
        storageUtils.storeUserData('bob', 'hope');
        assert.isTrue(setItem.calledOnce);
      });
    });

    describe('removeUserData util', () => {
      it('removes data from the storage', () => {
        storageUtils.removeUserData();
        assert.isTrue(removeItem.calledOnce);
      });
    });

    describe('retrieveUserData util', () => {
      it('gets the data from the storage', () => {
        storageUtils.retrieveUserData();
        assert.isTrue(getItem.calledOnce);
      });

      it('returns undefined if there is no credentials in the storage', () => {
        getItem = getItem.callsFake(() => false);
        assert.isFalse(storageUtils.retrieveUserData());
      });

      it('returns object with credentials', () => {
        getItem = getItem.callsFake(() => JSON.stringify({ name: 'Bob', token: 'Hope' }));
        const result = storageUtils.retrieveUserData();
        const expectedResult = { name: 'Bob', token: 'Hope' };
        assert.deepEqual(result, expectedResult);
      });
    });
  });

  describe('getUserData util', () => {
    it('returns null if no server response is passed', () => {
      assert.isNull(getUserData());
    });

    it('returns null if the provided response does not contain full set of credentials', () => {
      assert.isNull(getUserData({ user: 'bob' }));
    });

    it('returns credentials object', () => {
      const result = getUserData({ data: { user: 'Bob', token: 'Hope', foo: 'bar' } });
      const expectedResult = { name: 'Bob', token: 'Hope' };
      assert.deepEqual(result, expectedResult);
    })
  });
});
