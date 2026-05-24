import express from 'express'
import { getCoursesAnalytics, getOrdersAnalytics, getUsersAnalytics } from '../controllers/analytics.controller'
import { authorizeRole, isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.get("/get-users-anlaytics", isAuthenticated, authorizeRole("admin"), getUsersAnalytics)

router.get("/get-courses-anlaytics", isAuthenticated, authorizeRole("admin"), getCoursesAnalytics)

router.get("/get-orders-anlaytics", isAuthenticated, authorizeRole("admin"), getOrdersAnalytics)

export default router