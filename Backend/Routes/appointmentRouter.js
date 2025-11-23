import express from "express";
import { getAllAppointments, getAppointment, updateAppointmentStatus } from "../Controllers/appointmentController";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth";

const Router = express.Router();

Router.post("/post",isPatientAuthenticated,getAppointment)
Router.post("/getall",isAdminAuthenticated,getAllAppointments)
Router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
Router.delete("/delete/:id",isAdminAuthenticated,updateAppointmentStatus)

export default Router;