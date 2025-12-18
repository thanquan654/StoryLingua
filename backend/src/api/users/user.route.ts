import { Router } from 'express'
import * as userController from './user.controller.js'
import * as authMiddleware from '../auth/auth.middleware.js'

const router = Router()

router.get(
	'/me',
	authMiddleware.authenticateUser,
	userController.getUserProfile,
)

export default router
