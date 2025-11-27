import { Router } from 'express'
import * as authController from './auth.controller.js'
import * as validationRule from './validationRule.js'
import * as authMiddleware from './auth.middleware.js'

const router = Router()

router.post(
	'/login',
	validationRule.loginRules,
	authMiddleware.validate,
	authController.login,
)

router.post(
	'/register',
	validationRule.registerRule,
	authMiddleware.validate,
	authController.register,
)

export default router
