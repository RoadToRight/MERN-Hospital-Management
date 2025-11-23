import express from "express"
import { login, patientRegister } from "../Controllers/userController.js";

const Router = express.Router();

Router.post("/patient/register", patientRegister);
Router.post("/patient/login", login);

export default Router;