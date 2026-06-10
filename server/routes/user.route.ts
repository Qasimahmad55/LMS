import express from 'express'
import { activateUser, deleteUser, getAllUser, getUserInfo, loginUser, logoutUser, RegisterUser, socialAuth, udpateUserInfo, updateaccessToken, updatePassword, updateProfilePicture, updateUserRole } from '../controllers/user.controller'
import { authorizeRole, isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.post('/registeration', RegisterUser)
router.post('/activate-user', activateUser)
router.post('/login-user', loginUser)
router.get('/logout-user', updateaccessToken, isAuthenticated, logoutUser)
router.get('/me', updateaccessToken, isAuthenticated, getUserInfo)
router.get('/get-users', updateaccessToken, isAuthenticated, authorizeRole("admin"), getAllUser)
router.get('/refresh', updateaccessToken)
router.post('/socialAuth', socialAuth)
router.put('/update-user-info', updateaccessToken, isAuthenticated, udpateUserInfo)
router.put('/update-user-password', updateaccessToken, isAuthenticated, updatePassword)
router.put('/update-user-avatar', updateaccessToken, isAuthenticated, updateProfilePicture)
router.put('/update-user-role', updateaccessToken, isAuthenticated, authorizeRole("admin"), updateUserRole)
router.delete('/delete-user/:id', updateaccessToken, isAuthenticated, authorizeRole("admin"), deleteUser)

export default router