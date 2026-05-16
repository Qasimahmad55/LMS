import express from 'express'
import { activateUser, getUserInfo, loginUser, logoutUser, RegisterUser, socialAuth, udpateUserInfo, updateaccessToken, updatePassword, updateProfilePicture } from '../controllers/user.controller'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.post('/registeration', RegisterUser)
router.post('/activate-user', activateUser)
router.post('/login-user', loginUser)
router.get('/logout-user', isAuthenticated, logoutUser)
router.get('/me', isAuthenticated, getUserInfo)
router.get('/refresh', updateaccessToken)
router.post('/socialAuth', socialAuth)
router.put('/update-user-info', isAuthenticated, udpateUserInfo)
router.put('/update-user-password', isAuthenticated, updatePassword)
router.put('/update-user-avatar', isAuthenticated, updateProfilePicture)

export default router