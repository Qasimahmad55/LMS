import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { createOrder, getAllOrders } from '../controllers/order.controller'
import { updateaccessToken } from '../controllers/user.controller'

const router = express.Router()

router.post("/create-order", updateaccessToken, isAuthenticated, createOrder)
router.get("/get-orders", updateaccessToken, isAuthenticated, authorizeRole("admin"), getAllOrders)

export default router