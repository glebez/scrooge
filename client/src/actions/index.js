import axios from 'axios';
import Actions from './const';
import { handleAuthSuccess } from '../utils/auth';

export function fetchCurrencies() {
  return {
    type: Actions.FETCH_CURRENCIES,
    promise: axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR'),
  };
}

export function fetchPortfolio(token) {
  return {
    type: Actions.FETCH_PORTFOLIO,
    promise: axios({
      url: '/api/portfolio',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
}

export function savePortfolio(token, portfolio) {
  return {
    type: Actions.SAVE_PORTFOLIO,
    promise: axios({
      url: '/api/portfolio',
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: portfolio,
    }),
  };
}

export function signup(email, password, confirmPassword, history) {
  return {
    type: Actions.SIGNUP,
    promise: axios.post('/auth/register', { email, password, confirmPassword }),
    meta: {
      onSuccess: result => handleAuthSuccess(result, history),
    },
  };
}

export function login(email, password, history) {
  return {
    type: Actions.LOGIN,
    promise: axios.post('/auth/login', { email, password }),
    meta: {
      onSuccess: result => handleAuthSuccess(result, history),
    },
  };
}

export function setUser(name, token) {
  return {
    type: Actions.SET_USER,
    payload: {
      name,
      token,
    },
  };
}

export function logout() {
  return {
    type: Actions.LOGOUT,
  };
}

export function dismissError(type, index) {
  return {
    type: Actions.DISMISS_ERROR,
    payload: { type, index },
  };
}

export function requestPasswordReset(email) {
  return {
    type: Actions.REQUEST_PASSWORD_RESET,
    promise: axios.post('/auth/reset-password', { email }),
  };
}

export function resetPassword(password, confirmPassword, resetToken) {
  return {
    type: Actions.RESET_PASSWORD,
    promise: axios.post(`/auth/reset-password/${resetToken}`, { password, confirmPassword }),
  };
}
