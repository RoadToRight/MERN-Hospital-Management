import express from "express"
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../Controllers/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.post("/patient/register", patientRegister);
Router.post("/patient/login", login);
Router.post("/admin/register", isAdminAuthenticated, addNewAdmin);
Router.post("/doctor/addNew", isAdminAuthenticated, addNewDoctor)
Router.get("/doctors", getAllDoctors)
Router.get("/admin/me", isAdminAuthenticated, getUserDetails);
Router.get("/patient/me", isPatientAuthenticated, getUserDetails)
Router.get("/admin/logout", isAdminAuthenticated, logoutAdmin)
Router.get("/patient/logout", isPatientAuthenticated, logoutPatient)

export default Router;