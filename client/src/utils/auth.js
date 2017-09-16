const LOCAL_STORAGE_KEY = 'scroogeUser';

function redirectAfterAuth(history) {
  return history.push('/');
}

function storeUserData(name, token) {
  const credentials = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!credentials && name && token) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ name, token }));
  }
}

export function retrieveUserData() {
  const creds = localStorage.getItem(LOCAL_STORAGE_KEY);
  return creds && JSON.parse(creds);
}

export function removeUserData() {
  return localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getUserData(serverResponse) {
  const { user: name, token } = serverResponse || {};
  if (!name || !token) return null;
  return { name, token };
}

export function handleAuthSuccess(result, history) {
  redirectAfterAuth(history);
  const { name, token } = getUserData(result.data);
  storeUserData(name, token);
}
