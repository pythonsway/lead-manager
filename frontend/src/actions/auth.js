import axios from 'axios';

import { createMessage, returnErrors } from './messages';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_LEADS,
  EMAIL_SENT,
  EMAIL_FAIL
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
  // By default:
  // Headers 'content-type: application/json'
  // Request Body 'stringify'
  const body = { username, password };
  axios
    .post('/api/auth/login', body)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// REGISTER USER
export const register = (username, password, email) => dispatch => {
  const body = { username, email, password };
  axios
    .post('/api/auth/register', body)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CLEAR_LEADS
      });
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// PASSWORD RESET
export const passReset = (email) => dispatch => {
  const body = { email };
  axios
    .post('/api/auth/reset', body)
    .then(res => {
      dispatch(createMessage({ sendEmail: 'Email sent' }));
      dispatch({
        type: EMAIL_SENT
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EMAIL_FAIL
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
};
