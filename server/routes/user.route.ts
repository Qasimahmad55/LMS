import express from 'express'
import { activateUser, loginUser, RegisterUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/registeration', RegisterUser)
router.post('/activate-user', activateUser)
router.post('/login-user', loginUser)

export default router