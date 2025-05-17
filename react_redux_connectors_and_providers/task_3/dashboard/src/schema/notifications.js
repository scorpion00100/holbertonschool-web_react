import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';


// Define user entity
const user = new schema.Entity('users');

// Define message entity with 'guid' as the id attribute
const message = new schema.Entity(
  'messages',
  {},
  {
    idAttribute: 'guid',
  }
);

// Define notification entity with relationships to user and message
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

// Normalizer function
export const notificationsNormalizer = (data) => {
  return normalize(data, [notification]);
};

// Function to get notifications by userId
export function getAllNotificationsByUser(userId, normalizedData) {
  const { entities, result } = normalizedData;

  return result
    .filter((notificationId) => entities.notifications[notificationId].author === userId)
    .map((notificationId) => entities.messages[entities.notifications[notificationId].context]);
}

// Normalize the notifications data
export const normalizedData = normalize(notificationsData.default, [notification]);

// Export normalized data and entities
export default {
  normalizedData,
  notificationsNormalizer,
};
