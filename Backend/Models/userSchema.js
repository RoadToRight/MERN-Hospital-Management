import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide Valid Email"]
    },
    phone: {
        type: String, // string because min length only work in string
        required: true,
        minLength: [11, "Phone Number must contain 11 digits"],
        maxLength: [11, "Phone Number must contain 11 digits"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "Phone Number must contain 13 digits"],
        maxLength: [13, "Phone Number must contain 13 digits"],
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        required: [true, "Password must required"],
        minLength: [8, "Password must containcat least 8 characters"],
        select: false,
    },
    role: {
        enum: ["Admin", "Patient", "Doctor"],
        type: String,
        required: true,
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(comparePassword, this.password);
}

userSchema.methods.JwtTokenGenerator = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES })
}

export const User = mongoose.model("users", userSchema);