import express from "express";
import { getAllMessages, sendMessage } from "../Controllers/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.post("/send",sendMessage);
Router.get("/getall",isAdminAuthenticated,getAllMessages);


export default Router