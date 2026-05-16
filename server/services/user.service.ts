import { Response } from "express"
import userModel from "../models/user.model"
import { redis } from "../utils/redis"

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