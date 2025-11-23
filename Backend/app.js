import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import messageRoutes from "./Routes/messageRouter.js"
import userRouter from "./Routes/userRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();


dotenv.config({ path: "./config/.env" })
app.use(cors(
    {
        origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
        methods: ["POST", "GET", "DELETE", "PUT"], 
        credentials: true,
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))


app.use("/api/v1/message", messageRoutes)
app.use("/api/v1/user", userRouter)

dbConnection();
app.use(errorMiddleware)
export default app;