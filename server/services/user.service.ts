import { Response } from "express"
import userModel from "../models/user.model"
import { redis } from "../utils/redis"
import { CatchAsyncHandler } from "../middleware/catchAsyncErrors"

//get user by id
export const getUserById = async (id: string, res: Response) => {
    const userString = await redis.get(id)
    if (userString) {
        const user = JSON.parse(userString)
        res.status(201).json({
            success: true,
            user
        })
    }
}
//get all users
export const getAllUsersService = (async (res: Response) => {
    const users = await userModel.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        users
    })

})