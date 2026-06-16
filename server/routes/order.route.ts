import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { createOrder, getAllOrders, newPayment, sendStripePublishKey } from '../controllers/order.controller'
import { updateaccessToken } from '../controllers/user.controller'

const router = express.Router()

router.post("/create-order", updateaccessToken, isAuthenticated, createOrder)
router.get("/get-orders", updateaccessToken, isAuthenticated, authorizeRole("admin"), getAllOrders)

router.get("/payment/stripepublishablekey", sendStripePublishKey)

router.post("/payment", isAuthenticated, newPayment)

export default router