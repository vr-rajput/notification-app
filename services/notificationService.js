import { create, get, markAsReadNotification } from "../dao/notificationDao.js";
// import { getSocketInstance } from "../socket/socket.js";

export const sendNotification = async (req, res) => {
    try {
        console.log("notification sends");
        const { senderId, receiverId, message } = req.body;
        console.log("req.body: ", req.body);
        // const { id } = req.user;

        // if (id != senderId) return res.status(400).json({ error: "invalid senderId or use senderId as a login user" });
        if (!message || message.length > 255) return res.status(400).json({ error: "Invalid message or message has a max length of 255 characters" });
        const notification = await create(senderId, receiverId, message);

        console.log(">>>>>>>>>>>>>>>>>>>>>");

        return res.status(201).json(notification);
    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}

export const getNotifications = async (req, res) => {
    try {
        const notifications = await get(req?.user?.id);
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const notification = await markAsReadNotification(req.params?.id, req.user?.id);
        if (!notification) return res.status(404).json({ error: "Notification not found." });
        return res.json({ message: "Notification marked as read." });
    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}