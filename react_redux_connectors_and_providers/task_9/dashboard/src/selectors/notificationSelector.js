import { createSelector } from 'reselect';
import { Map } from 'immutable';

export function getFilter(state) {
  return state.get('filter');
}

export const getNotifications = (state) => {
  return Map(state.get('notifications').get('messages'));
};


export const getUnreadNotificationsByType = createSelector(
  [getNotifications, getFilter],
  (notifications, filter) => {
    // Filtrer les notifications non lues
    const unreadNotifications = notifications.filter(notification => !notification.isRead);

    // Si le filtre est "urgent", ne renvoyer que les notifications urgentes non lues
    if (filter === 'urgent') {
      return unreadNotifications.filter(notification => notification.type === 'urgent');
    }

    // Si le filtre est "default", renvoyer toutes les notifications non lues
    return unreadNotifications;
  }
);
