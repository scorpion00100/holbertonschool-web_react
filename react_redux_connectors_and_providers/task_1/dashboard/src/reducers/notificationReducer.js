import { Map, fromJS } from 'immutable';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  NotificationTypeFilters
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

// Default state as an Immutable.js Map
const initialState = Map({
  filter: NotificationTypeFilters.DEFAULT,
  notifications: fromJS({}),
});

// Notifications reducer function
export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const normalizedData = notificationsNormalizer(action.data);
      const notificationsWithIsRead = fromJS(normalizedData.entities.notifications).map(notification =>
        notification.set('isRead', false)
      );
      return state.set('notifications', notificationsWithIsRead);
    }

    case MARK_AS_READ:
      return state.setIn(['notifications', String(action.index), 'isRead'], true);

    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);

    default:
      return state;
  }
}

export default notificationReducer;
