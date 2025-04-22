import * as JSONData from "../../../../notifications.json";

export default function getAllNotificationsByUser(userId) {
    const allContexts = [];

    JSONData.default.forEach((notification) => {
        if (notification.author.id === userId) {
            allContexts.push(notification.context);
        }
    });

    return allContexts;
}
