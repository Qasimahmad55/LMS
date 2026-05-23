import { NextFunction, Response, Request } from "express";
import { CatchAsyncHandler } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import path from "path";
import ejs from 'ejs'
import sendEmail from "../utils/sendMail";
import notificationModel from "../models/notification.model";


//create order
export const createOrder = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder
        const userId = req.user?._id.toString()

        if (!userId) {
            return next(new ErrorHandler("User not found", 404))
        }
        const user = await userModel.findById(userId)

        const courseExistsInUser = user?.courses.some((course: any) => course._id.toString() === courseId)

        if (courseExistsInUser) {
            return next(new ErrorHandler("You have already purchased this course", 404))
        }

        const course = await CourseModel.findById(courseId)
        if (!course) {
            return next(new ErrorHandler("Course not found", 404))

        }
        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_info
        }


        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), { order: mailData })

        try {
            if (user) {
                await sendEmail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }

        user?.courses.push({ courseId: course._id.toString() })
        await user?.save()

        await notificationModel.create({
            userId,
            title: "New Order",
            message: `You have new Order from ${course?.name}`
        })

        course.purchased ? course.purchased += 1 : course.purchased

        await course.save()

        newOrder(data, res, next)


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})
//get all orders
export const getAllOrders = CatchAsyncHandler(async (res: Response, next: NextFunction) => {
    try {
        getAllOrdersService(res)
    } catch (error: any) {
        return next(new ErrorHandler(error.messagge, 500))
    }
})
