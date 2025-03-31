import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/database.js"; // Database connection
import authRoutes from "./routes/userRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use (cors());
// Sync Database
sequelize.sync().then(() => {
    console.log("All models synchronized.");
});

//Routes  
app.use("/user", authRoutes);
app.use("/notification", notificationRoute);


const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(`server running on ${port}`);
})
