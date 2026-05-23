import express from 'express'
import { activateUser, deleteUser, getAllUser, getUserInfo, loginUser, logoutUser, RegisterUser, socialAuth, udpateUserInfo, updateaccessToken, updatePassword, updateProfilePicture, updateUserRole } from '../controllers/user.controller'
import { authorizeRole, isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.post('/registeration', RegisterUser)
router.post('/activate-user', activateUser)
router.post('/login-user', loginUser)
router.get('/logout-user', isAuthenticated, logoutUser)
router.get('/me', isAuthenticated, getUserInfo)
router.get('/get-users', isAuthenticated, authorizeRole("admin"), getAllUser)
router.get('/refresh', updateaccessToken)
router.post('/socialAuth', socialAuth)
router.put('/update-user-info', isAuthenticated, udpateUserInfo)
router.put('/update-user-password', isAuthenticated, updatePassword)
router.put('/update-user-avatar', isAuthenticated, updateProfilePicture)
router.put('/update-user-role', isAuthenticated, authorizeRole("admin"), updateUserRole)
router.delete('/delete-user/:id', isAuthenticated, authorizeRole("admin"), deleteUser)

export default router