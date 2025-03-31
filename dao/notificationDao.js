import notification from "../models/notifications.js";

export const create = async (senderId, receiverId, message) => {
    return await notification.create({ senderId, receiverId, message });
};

export const get = async (userId) => {
    return await notification.findAll({ where: { receiverId: userId } });
};

export const markAsReadNotification = async (id, userId) => {
    console.log("id, userId: ", id, userId);
    const notificationResponse = await notification.findOne({ where: { id, receiverId: userId } });
    if (!notificationResponse) return null;
    notificationResponse.isRead = true;
    await notificationResponse.save();
    return notificationResponse;
  };