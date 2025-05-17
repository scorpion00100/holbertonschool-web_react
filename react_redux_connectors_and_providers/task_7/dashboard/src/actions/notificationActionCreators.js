import { MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';
import { bindActionCreators } from 'redux';
import { notificationsNormalizer } from '../schema/notifications';

// Action creator for marking a notification as read
export function markAsRead(index) {
  return {
    type: MARK_AS_READ,
    index,
  };
}

// Action creator for setting the notification filter
export function setNotificationFilter(filter) {
  return {
    type: SET_TYPE_FILTER,
    filter,
  };
}

// Action creator for setting the loading state
export function setLoadingState(isLoading) {
  return {
    type: SET_LOADING_STATE,
    isLoading,
  };
}

// Action creator for setting notifications
export function setNotifications(notifications) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

// Action creator for fetching notifications
export function fetchNotifications() {
  return (dispatch) => {
    // Set loading state to true at the beginning of the fetch
    dispatch(setLoadingState(true));

    // Fetch the notifications data
    fetch('/notifications.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("ma data brute:", data)
        // Normalize the fetched notifications
        const normalizedData = notificationsNormalizer(data);
        console.log("ma data normalisé", normalizedData)
        // Dispatch the fetched and normalized notifications
        dispatch(setNotifications(normalizedData));
        // Set loading state to false after fetch is complete
        dispatch(setLoadingState(false));
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        // In case of error, still set loading state to false
        dispatch(setLoadingState(false));
      });
  };
}

// Function that binds the action creators to the dispatch
export function boundNotificationActions(dispatch) {
  return bindActionCreators(
    {
      markAsRead,
      setNotificationFilter,
      setLoadingState,
      setNotifications,
      fetchNotifications,
    },
    dispatch
  );
}
