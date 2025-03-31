import express from "express";
import { sendNotification, getNotifications, markAsRead } from "../services/notificationService.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", sendNotification);
router.get("/get", authenticateToken, getNotifications);
router.put("/:id/read", authenticateToken, markAsRead);

export default router;
