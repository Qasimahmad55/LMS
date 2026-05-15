import express from 'express'
import { activateUser, loginUser, logoutUser, RegisterUser, updateaccessToken } from '../controllers/user.controller'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.post('/registeration', RegisterUser)
router.post('/activate-user', activateUser)
router.post('/login-user', loginUser)
router.get('/logout-user', isAuthenticated, logoutUser)
router.get('/refresh', updateaccessToken)

export default router