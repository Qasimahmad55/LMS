require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorMiddleware } from './middleware/error'
import userRouter from './routes/user.route'
import courseRouter from './routes/course.route'
import orderRouter from './routes/order.route'
import notificationRouter from './routes/notification.route'
import analyticsRouter from './routes/analytics.route'
import layoutRouter from './routes/layout.route'
import { rateLimit } from 'express-rate-limit'

export const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(cors({
    origin: ['https://lms-client-seven-navy.vercel.app'],
    credentials: true
}))

app.use('/api/v1', userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter)

//api request limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
});

//test route

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Api is working"
    })

})
//unknown routes

app.all("/*path", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any
    err.statusCode = 404
    next(err)
})
app.use(limiter);
app.use(errorMiddleware)



