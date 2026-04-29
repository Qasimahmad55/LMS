import express from 'express'
import { RegisterUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/registeration', RegisterUser)

export default router