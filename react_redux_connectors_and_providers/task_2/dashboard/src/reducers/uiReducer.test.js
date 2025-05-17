import uiReducer from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER
} from '../actions/uiActionTypes';
import { Map } from 'immutable';


// Initial state using Immutable.js Map
const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
});

describe('uiReducer', () => {
  // Test 1: No action should return the initial state
  it('should return the initial state when no action is passed', () => {
    const state = uiReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState.toJS());
  });

  // Test 2: An unrelated action should return the initial state
  it('should return the initial state when an unrelated action is passed', () => {
    const state = uiReducer(undefined, { type: 'SELECT_COURSE' });
     expect(state.toJS()).toEqual(initialState.toJS());
  });

  // Test 3: DISPLAY_NOTIFICATION_DRAWER should set isNotificationDrawerVisible to true
  it('should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.toJS().isNotificationDrawerVisible).toBe(true);
  });

});
