import express from "express";
import { sendMessage } from "../Controllers/messageController.js";

const Router = express.Router();

Router.post("/send",sendMessage)

export default Router