import { NextFunction, Response, Request } from "express";
import { CatchAsyncHandler } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import notificationModel from "../models/notification.model";
import cron from 'node-cron'

//get all notification --only for admin
export const getNotifications = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await notificationModel.find().sort({ createdAt: -1 })
        res.status(201).json({
            success: true,
            notification
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})
//update notification status
export const updateNotification = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await notificationModel.findById(req.params.id)

        if (!notification) {
            return next(new ErrorHandler("Notification not found", 500))

        } else {
            notification.status ? notification.status = "read" : notification.status
        }

        await notification?.save()

        const notifications = await notificationModel.find().sort({ createdAt: -1 })

        res.status(201).json({
            success: true,
            notifications
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))

    }
})
//delete notification --only admin

cron.schedule("*/5 * * * * *", function () {
    console.log("-----------------------");
    console.log("running cron");
    
})