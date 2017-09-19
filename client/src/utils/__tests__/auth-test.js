import { assert } from 'chai';
import sinon from 'sinon';
import { createStorageUtils } from '../auth';

describe('storage utils', () => {
  const storage = {
    getItem: () => null,
    setItem: () => null,
  };
  const storageUtils = createStorageUtils(storage);

  describe('storeUserData util', () => {
    let setItem = sinon.spy(storage, 'setItem');
    let getItem = sinon.stub(storage, 'getItem');
    afterEach(() => {
      typeof getItem.reset === 'function' ? getItem.reset() : null;
      typeof setItem.reset === 'function' ? setItem.reset() : null;
    });

    it('checks the storage for existing credentials', () => {
      storageUtils.storeUserData('bob', 'hope');
      assert.isTrue(getItem.called);
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
      assert.isTrue(setItem.called);
    });
  });
});
