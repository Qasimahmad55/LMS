import { NextFunction, Request, Response } from "express"
import { CatchAsyncError } from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import userModel from "../models/user.model"

//register user
interface IRegisterationBody {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export const RegisterUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const isEmail = await userModel.find({ email })

        if (isEmail) {
            return next(new ErrorHandler("Email Already Exists!", 400));
        }

        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})