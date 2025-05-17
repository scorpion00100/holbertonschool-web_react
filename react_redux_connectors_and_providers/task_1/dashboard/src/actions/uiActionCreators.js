import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE } from "./uiActionTypes";
import { bindActionCreators } from 'redux';
import fetch from 'node-fetch';

// Action creator for login
export function login(email, password) {
  return {
    type: LOGIN,
    user: {
      email,
      password,
    },
  };
}

// Action creator for login success
export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

// Action creator for login failure
export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

// Action creator for logout
export function logout() {
  return {
    type: LOGOUT,
  };
}

// Action creator for displaying the notification drawer
export function displayNotificationDrawer() {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
}

// Action creator for hiding the notification drawer
export function hideNotificationDrawer() {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
}

// Fonction qui lie les créateurs d'actions au dispatch
export function boundUiActions(dispatch) {
  return bindActionCreators(
    {
      login,
      logout,
      displayNotificationDrawer,
      hideNotificationDrawer,
      loginSuccess,
      loginFailure,
    },
    dispatch
  );
}

// Async login request function using redux-thunk
export function loginRequest(email, password) {
  return async function (dispatch) {
    // Dispatch the login action first
    dispatch(login(email, password));

    try {
      // Make the API call using node-fetch
      const response = await fetch('/dist/login-success.json');

      if (!response.ok) {
        // If the response is not OK, throw an error to trigger the failure
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Dispatch loginSuccess if valid email exists
      if (data.email) {
        dispatch(loginSuccess());
      } else {
        throw new Error('Invalid response data');
      }

    } catch (error) {
      // If the API call fails, dispatch loginFailure
      dispatch(loginFailure());
    }
  };
}
