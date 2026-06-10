import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { createLayout, editLayout, getLayoutByType } from '../controllers/layout.controller'
import { updateaccessToken } from '../controllers/user.controller'
const router = express.Router()

router.post("/create-layout", updateaccessToken, isAuthenticated, authorizeRole("admin"), createLayout)

router.put("/edit-layout", updateaccessToken, isAuthenticated, authorizeRole("admin"), editLayout)

router.get("/get-layout", updateaccessToken, isAuthenticated, authorizeRole("admin"), getLayoutByType)

export default router