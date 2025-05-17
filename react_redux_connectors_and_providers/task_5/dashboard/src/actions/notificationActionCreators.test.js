import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from './notificationActionTypes';
import { markAsRead, setNotificationFilter } from './notificationActionCreators';

describe('notificationActionCreators tests', () => {
  // Test for markAsRead action creator
  it('markAsRead should create the correct action', () => {
    const expectedAction = {
      type: MARK_AS_READ,
      index: 1
    };
    expect(markAsRead(1)).toEqual(expectedAction);
  });

  // Test for setNotificationFilter action creator
  it('setNotificationFilter should create the correct action for DEFAULT filter', () => {
    const expectedAction = {
      type: SET_TYPE_FILTER,
      filter: "DEFAULT"
    };
    expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual(expectedAction);
  });
});
