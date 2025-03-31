import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "node:path";

const port = process.env.PORT || 6000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Store connected users (userId -> socketId)
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ID: ${socket.id}`);
  });

  socket.on("sendNotification", async({ senderId, receiverId, message }) => {
    console.log("senderId, receiverId, message: ", senderId, receiverId, message);
    const receiverSocketId = connectedUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveNotification", { senderId, message });
      console.log(`Notification sent to user ${receiverId}`);
    } else {
      console.log(`User ${receiverId} is offline.`);
    }
         // Call API to save notification
    try {
      let resp = await fetch(`http://localhost:${port}/notification/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId, message }),
      });
      console.log("Notification saved in DB", resp);
    } catch (error) {
      console.error("Error saving notification:", error);
    }
    // }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});
