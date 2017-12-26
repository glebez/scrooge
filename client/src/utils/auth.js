const LOCAL_STORAGE_KEY = 'scroogeUser';

function redirectAfterAuth(history) {
  return history.push('/');
}

// This wrapper makes the storage operations sooo much easier to test
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

export function getUserData(payload) {
  const { user: name, token } = (payload && payload.data) || {};
  if (!name || !token) return null;
  return { name, token };
}

export function getErrorMessage(payload) {
  const data = (payload && payload.response && payload.response.data) || {};
  let error;
  if (Array.isArray(data)) {
    error = data.map(err => err.msg);
  } else {
    error = [data.message || "Hm... we can't get to out server. Try again later."];
  }
  return { error };
}

export function handleAuthSuccess(result, history) {
  redirectAfterAuth(history);
  const { name, token } = getUserData(result);
  storageUtils.storeUserData(name, token);
}
