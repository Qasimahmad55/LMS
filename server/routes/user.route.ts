import express from 'express'
import { activateUser, loginUser, logoutUser, RegisterUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/registeration', RegisterUser)
router.post('/activate-user', activateUser)
router.post('/login-user', loginUser)
router.get('/logout-user', logoutUser)

export default router