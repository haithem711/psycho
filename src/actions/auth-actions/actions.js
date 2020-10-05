/*
@
 This file contains the actions creators
@
*/

import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  CHECK_AUTH_REQUEST,
  LOGOUT_REQUEST,
  CONNECT_THE_USER
} from "./types";

import { ALERT_ERROR, ALERT_SUCCESS, HIDE_ALERT } from "../alert-actions/types";

import AuthServices from "./service";

export function getAuthedUser() {
  return async dispatch => {
    await dispatch({
      type: CHECK_AUTH_REQUEST
    });
    try {
      const response = await AuthServices.checkAuthRequest();
      await dispatch({
        type: CHECK_AUTH_SUCCESS,
        payload: {
          user: response.data,
          isLoggedIn: true
        }
      });
    } catch (e) {
      dispatch({
        type: CHECK_AUTH_FAILURE
      });
    }
  };
}

export function login(values) {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await AuthServices.loginRequest(values);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      localStorage.setItem("token_copsycho", response.data.access_token);
      dispatch({ type: ALERT_SUCCESS, payload: "Logged In!" });

      dispatch({ type: HIDE_ALERT });
    } catch (e) {
      if (e) {
        if (e.response) {
          if (e.response.status) {
            if (e.response.status === 400) {
              if (e.response.data) {
                dispatch({
                  type: ALERT_ERROR,
                  payload: "Verify your email and password"
                });
                dispatch({ type: HIDE_ALERT });
              }
            }
            if (e.response.status === 401) {
              if (e.response.data) {
                dispatch({
                  type: ALERT_ERROR,
                  payload: "Verify your email and password"
                });
                dispatch({ type: HIDE_ALERT });
              }
            }
            if (e.response.status === 429) {
              if (e.response.data) {
                dispatch({ type: ALERT_ERROR, payload: "Too many requests!" });
                dispatch({ type: HIDE_ALERT });
              }
            }
          }
        }
      }
      dispatch({ type: LOGIN_ERROR });

      dispatch({ type: ALERT_ERROR, payload: "Server Problem, Sorry!" });
    }
  };
}

export function signup(values) {
  return async dispatch => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const response = await AuthServices.signupRequest(values);
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      dispatch({ type: ALERT_SUCCESS, payload: "Signed up!" });
      localStorage.setItem("token_copsycho", response.data.access_token);
    } catch (e) {
      if (e.response) {
        if (e.response.status) {
          if (e.response.status === 422) {
            if (e.response.data) {
              e.response.data.errors.email.map(item => {
                dispatch({ type: ALERT_ERROR, payload: item });
                dispatch({ type: HIDE_ALERT });
                return null;
              });
            }
          }
        }
      }
      dispatch({ type: SIGNUP_ERROR });
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      await AuthServices.logoutRequest();
      dispatch({ type: ALERT_SUCCESS, payload: "Logged Out, Bye!" });
      localStorage.removeItem("token_copsycho");
    } catch (e) {
      if (e.response.status === 422) {
        if (e.response.data) {
          e.response.data.errors.email.map(item => {
            dispatch({ type: ALERT_ERROR, payload: item });
            dispatch({ type: HIDE_ALERT });
            return null;
          });
        }
      }
    }

    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 400);
  };
}

export function connectTheUser(token) {
  return async dispatch => {
    localStorage.setItem("token_copsycho", token);
    dispatch({
      type: CONNECT_THE_USER,
      payload: {
        token: token
      }
    });
  };
}
