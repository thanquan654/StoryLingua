import { Router } from 'express'
import * as authController from './auth.controller.js'
import * as validationRule from './validationRule.js'
import * as authMiddleware from './auth.middleware.js'
import { authLimiter } from '../../middlewares/rateLimiters.js'

const router = Router()

router.post(
	'/login',
	authLimiter,
	validationRule.loginRules,
	authMiddleware.validate,
	authController.login,
)

router.post(
	'/register',
	authLimiter,
	validationRule.registerRule,
	authMiddleware.validate,
	authController.register,
)

router.post('/logout', authLimiter, authController.logout)

router.post('/refresh-token', authLimiter, authController.refreshToken)

export default router
