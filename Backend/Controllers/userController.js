import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../Models/userSchema.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role) {
        return next(new ErrorHandler("Please Give Complete Details", 400))
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already Registered", 400))
    }

    user = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role });

    res.status(200).json({
        succes: true,
        message: "User Registered!"
    })
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role, confirmPassword } = req.body;
    if (!email || !password || !role || !confirmPassword) {
        return next(new ErrorHandler("Please Provide all details"), 400)
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwrd and confirm passwords do not match", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password"))
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email or Password"))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found", 404))
    }
    TokenGenerator(user, res, "User Login Successfully", 200)

})

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role) {
        return next(new ErrorHandler("Please Give Complete Details", 400))
    }

    const isRegistered = await User.findOne({email});

    if(isRegistered){
        return next(new ErrorHandler("Admin with this email already exist"))
    }
    
})