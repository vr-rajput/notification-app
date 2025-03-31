import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.js";

const notification = sequelize.define ( 
    "Notification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true             
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                Model: User,
                key: "id"
            },
            OnDelete: "CASCADE"
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                Model: User,
                key: "id"
            },
            OnDelete: "CASCADE"
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    },
    {
        timestamps: true,
        tableName: "notifications"
    }
);

// define association
User.hasMany( notification, { foreignKey: "senderId", as: "sentNotificaons"});
User.hasMany( notification, { foreignKey: "receiverId", as: "receivedNotifications" });
notification.belongsTo( User, { foreignKey: "senderId", as: "sender"});
notification.belongsTo( User, { foreignKey: "receiverId", as: "receiver"});

export default notification;

