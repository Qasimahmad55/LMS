import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { getNotifications, updateNotification } from '../controllers/notification.controller'
import { updateaccessToken } from '../controllers/user.controller'

const router = express.Router()

router.get("/get-all-notifications",updateaccessToken, isAuthenticated, authorizeRole("admin"), getNotifications)

router.put("/update-notification/:id",updateaccessToken, isAuthenticated,authorizeRole("admin"), updateNotification)

export default router