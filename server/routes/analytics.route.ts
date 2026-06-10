import express from 'express'
import { getCoursesAnalytics, getOrdersAnalytics, getUsersAnalytics } from '../controllers/analytics.controller'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { updateaccessToken } from '../controllers/user.controller'

const router = express.Router()

router.get("/get-users-anlaytics", updateaccessToken, isAuthenticated, authorizeRole("admin"), getUsersAnalytics)

router.get("/get-courses-anlaytics", updateaccessToken, isAuthenticated, authorizeRole("admin"), getCoursesAnalytics)

router.get("/get-orders-anlaytics", updateaccessToken, isAuthenticated, authorizeRole("admin"), getOrdersAnalytics)

export default router