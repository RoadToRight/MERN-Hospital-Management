import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/errorMiddleware";
import { Appointment } from "../Models/appointmentSchema";
import { User } from "../Models/userSchema";

export const getAppointment = catchAsyncErrors(async(req,res,next) => {

    const {firstName,lastName,email,phone,nic,dob,gender,appointment_data,department,doctor_firstName,doctor_lastName,hasVisited,doctorId,patientId,address,status} = req.body;

    if(!firstName || lastName || email || phone || nic || dob || gender || appointment_data || department||doctor_firstName || doctor_lastName || hasVisited || doctorId || patientId || address || status ){
        return next(new ErrorHandler("Please Provide Complete Details",400))
    }

    const isConflict = await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    })

    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor Not Found",404));
    }

        if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors Conflict! Please Contact Through Email or Phone!",404));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user_id;

    const appointment = await Appointment.create({
        firstName,lastName,email,phone,nic,dob,gender,appointment_data,department,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName
        },hasVisited,doctorId,patientId,address
    })

    res.status(200).json({
        success:true,
        message:"Appointment Booked Successfully"
    })
})


export const getAllAppointments = catchAsyncErrors(async(req,res,next) => {
    const appointments = await Appointment.find({});

    res.status(200).json({
        success:true,
        appointments,
    })
})

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404))
    }
    appointment = await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
})


export const deleteAppointment = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
       if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404))
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment Deleted Successfully!"
    })
})