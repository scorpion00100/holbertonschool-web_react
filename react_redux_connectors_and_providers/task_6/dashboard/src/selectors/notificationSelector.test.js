import { fromJS } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

describe('notificationSelector', () => {
  const state = fromJS({
    filter: NotificationTypeFilters.DEFAULT,
    notifications: [
      { id: 1, isRead: true, type: 'default', value: 'Notification 1' },
      { id: 2, isRead: false, type: 'urgent', value: 'Notification 2' },
      { id: 3, isRead: false, type: 'default', value: 'Notification 3' },
    ],
  });

  it('filterTypeSelected should return the current filter type', () => {
    expect(filterTypeSelected(state)).toEqual(NotificationTypeFilters.DEFAULT);
  });

  it('getNotifications should return all notifications', () => {
    const expectedNotifications = fromJS([
      { id: 1, isRead: true, type: 'default', value: 'Notification 1' },
      { id: 2, isRead: false, type: 'urgent', value: 'Notification 2' },
      { id: 3, isRead: false, type: 'default', value: 'Notification 3' },
    ]);
    expect(getNotifications(state)).toEqual(expectedNotifications);
  });

  it('getUnreadNotifications should return only unread notifications', () => {
    const expectedUnreadNotifications = fromJS([
      { id: 2, isRead: false, type: 'urgent', value: 'Notification 2' },
      { id: 3, isRead: false, type: 'default', value: 'Notification 3' },
    ]);
    expect(getUnreadNotifications(state)).toEqual(expectedUnreadNotifications);
  });
});
