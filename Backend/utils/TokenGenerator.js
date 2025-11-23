import { User } from "../Backend/Models/userSchema"

export const TokenGenerator = (user, res, message, code) => {
    const Token = User.JwtTokenGenerator();
    const cookieName = user.role === "Admin" ? "AdminToken" : "PatientToken"
    res.status(code).cookie(cookieName, Token, { expires: new Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000}).json({
        success: true,
        message: message,
    }) 

}