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
import Stripe from 'stripe'
import { redis } from "../utils/redis";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

//create order
export const createOrder = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder
        const userId = req.user?._id.toString()

        if (payment_info) {
            if ("id" in payment_info) {
                const paymentIntentId = (payment_info as any).id
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    paymentIntentId
                )

                if (paymentIntent.status !== "succeeded") {
                    return next(new ErrorHandler("Payment not authorized!", 400));
                }
            }


        }

        if (!userId) {
            return next(new ErrorHandler("User not found", 404))
        }
        const user = await userModel.findById(userId)

        const courseExistsInUser = user?.courses.some((course: any) => course.courseId.toString() === courseId.toString())

        if (courseExistsInUser) {
            return next(new ErrorHandler("You have already purchased this course", 400))
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

        // Update user in Redis after successful save
        await redis.set(userId, JSON.stringify(user));

        await notificationModel.create({
            userId,
            title: "New Order",
            message: `You have new Order from ${course?.name}`
        })

        const updatedCourse = await CourseModel.findByIdAndUpdate(
            course._id,
            { $inc: { purchased: 1 } },
            { new: true }
        )

        // Update course in Redis cache
        if (updatedCourse) {
            await redis.set(courseId, JSON.stringify(updatedCourse))
        }

        newOrder(data, res, next)


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})
//get all orders
export const getAllOrders = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllOrdersService(res)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

//send stripe publish key
export const sendStripePublishKey = CatchAsyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})
//new payment
export const newPayment = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "USD",
            metadata: {
                companyName: "E-Learning"
            },
            automatic_payment_methods: {
                enabled: true
            }
        })

        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})