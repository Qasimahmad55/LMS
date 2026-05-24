import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth'
import { createLayout, editLayout, getLayoutByType } from '../controllers/layout.controller'
const router = express.Router()

router.post("/create-layout", isAuthenticated, authorizeRole("admin"), createLayout)

router.put("/edit-layout", isAuthenticated, authorizeRole("admin"), editLayout)

router.get("/get-layout", isAuthenticated, authorizeRole("admin"), getLayoutByType)

export default router