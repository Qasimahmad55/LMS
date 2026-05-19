import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { getNotifications, updateNotification } from '../controllers/notification.controller'

const router = express.Router()

router.get("/get-all-notifications", isAuthenticated, authorizeRole("admin"), getNotifications)

router.put("/update-notification/:id", isAuthenticated,authorizeRole("admin"), updateNotification)

export default router