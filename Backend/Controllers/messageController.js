import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { messageModel } from "../Models/messageSchema.js";


export const sendMessage = catchAsyncErrors(async (req, res, next) => {

    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill full form",400))
    }
    await messageModel.create({ firstName, lastName, email, phone, message })
    res.status(200).json({
        success: true,
        message: "Message Sent Sucessfully"
    })
})