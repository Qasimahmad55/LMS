import { NextFunction, Request, Response } from "express"
import { CatchAsyncError } from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import userModel, { IUser } from "../models/user.model"
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import ejs from 'ejs'
import path from "path"
import sendEmail from "../utils/sendMail"
dotenv.config()
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
        const isEmail = await userModel.findOne({ email })

        if (isEmail) {
            return next(new ErrorHandler("Email Already Exists!", 400));
        }

        const user: IRegisterationBody = {
            name,
            email,
            password
        }

        const activationToken = createActivationToken(user)

        const activationCode = activationToken.activationCode

        const data = { user: { name: user.name }, activationCode }

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data)

        try {
            await sendEmail({
                email: user.email,
                subject: "Activate your Account",
                template: "activation-mail.ejs",
                data,
            })

            res.status(201).json({
                success: true,
                message: `Please check your email:${user.email} to activate your account`,
                activationToken: activationToken.token
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})
interface IActivationToken {
    token: string,
    activationCode: string
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const token = jwt.sign(
        { user, activationCode },
        process.env.ACTIVATION_SECRET as Secret,
        { expiresIn: "5m" }
    )
    return { token, activationCode }
}

//activate user

interface IActivationRequest {
    activation_token: string,
    activation_code: string,
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest

        const newUser: { user: IUser, activatioCode: string } = jwt.verify(
            activation_token, process.env.ACTIVATION_SECRET as string
        ) as { user: IUser, activatioCode: string }

        if (newUser.activatioCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400));
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})