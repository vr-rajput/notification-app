# notification-app

A real-time notification system using Node.js, Express, Socket.io, and Mysql.

🚀 Features

Real-time notifications using Socket.io

API for saving notifications in Mysql   

Simple frontend UI for testing


Setup Instructions

 Installation

Make sure you have Node.js and MongoDB installed.

Clone the repository:
git clone https://github.com/vr-rajput/notification-app
cd notification-app


Install dependencies:
npm install

 Environment Variables

Create a .env file in the root folder and add:
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
JWT_SECRET=


Running the Application

Start the backend server
nodemon


Start the socket
node socket.js




 API Documentation

Register a User

http://localhost:${port}/user/register
{
    "username": "nicky",
    "password": "123"
}


Login User
http://localhost:${port}/user/login
{
    "username": "nicky",
    "password": "123"
}
Response: 
{
    "message": "Login successful",
    "token": "",
    "user": {
        "id": 1,
        "username": "",
        "password": "",
        "createdAt": "",
        "updatedAt": ""
    }
}

Send Notofication
http://localhost:${port}/notification/send
{
"senderId": 1,
"receiverId": 2,
"message": "testing"
}

Mark as read:
http://localhost:${port}/notification/${id}/read
header:{
    "Authorization": `Bearer `
}

Get all notification:
http://localhost:${port}/notification/get
header:{
    "Authorization": `Bearer `
}

Response: 
[
    {
        "id": 4,
        "senderId": 2,
        "receiverId": 1,
        "message": "Hello from user123",
        "isRead": null,
        "createdAt": "2025-03-28T07:27:38.000Z",
        "updatedAt": "2025-03-28T07:27:38.000Z"
    },
]