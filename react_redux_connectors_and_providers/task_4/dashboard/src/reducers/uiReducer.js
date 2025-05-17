import { Map } from 'immutable';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGIN
} from '../actions/uiActionTypes';

// Initial state using Immutable.js Map
const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: null,
});

// Reducer function with Immutable.js
export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);

    case HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);

    case LOGIN_SUCCESS:
      return state.set('isUserLoggedIn', true);

    case LOGIN:
      return state
        .set('isUserLoggedIn', true)
        .set('user', action.user);

    case LOGIN_FAILURE:
    case LOGOUT:
      return state
        .set('isUserLoggedIn', false)
        .set('user', null);

    default:
      return state;
  }
}


export default uiReducer;
