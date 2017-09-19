const LOCAL_STORAGE_KEY = 'scroogeUser';

function redirectAfterAuth(history) {
  return history.push('/');
}

export function createStorageUtils(storage) {
  function storeUserData(name, token) {
    const credsStorage = storage || localStorage;
    const credentials = credsStorage.getItem(LOCAL_STORAGE_KEY);
    if (!credentials && name && token) {
      credsStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ name, token }));
    }
  }

  function retrieveUserData() {
    const credsStorage = storage || localStorage;
    const creds = credsStorage.getItem(LOCAL_STORAGE_KEY);
    return creds && JSON.parse(creds);
  }

  function removeUserData() {
    const credsStorage = storage || localStorage;
    return credsStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return {
    storeUserData,
    retrieveUserData,
    removeUserData,
  };
}

const storageUtils = createStorageUtils();

export function getUserData(serverResponse) {
  const { user: name, token } = serverResponse || {};
  if (!name || !token) return null;
  return { name, token };
}

export function handleAuthSuccess(result, history) {
  redirectAfterAuth(history);
  const { name, token } = getUserData(result.data);
  storageUtils.storeUserData(name, token);
}
