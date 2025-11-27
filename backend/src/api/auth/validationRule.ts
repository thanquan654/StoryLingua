import { body } from 'express-validator'

export const loginRules = [
	body('*').trim().escape(),
	body('email')
		.notEmpty()
		.withMessage('Email is require')
		.isEmail()
		.withMessage('Invalid email format')
		.normalizeEmail(),

	body('password')
		.notEmpty()
		.withMessage('Password is require')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
]

export const registerRule = [
	body('*').trim().escape(),
	body('displayName').notEmpty().withMessage('Display Name is require'),
	body('email')
		.notEmpty()
		.withMessage('Email is require')
		.isEmail()
		.withMessage('Invalid email format')
		.normalizeEmail(),
	body('password')
		.notEmpty()
		.withMessage('Password is require')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	body('confirmPassword')
		.notEmpty()
		.withMessage('Confirm Password is require')
		.isLength({ min: 6 })
		.withMessage('Confirm Password must be at least 6 characters long')
		.custom((confirmPassword, { req }) => {
			if (req.body.password !== confirmPassword) {
				throw new Error('Password confirmation does not match password')
			}
			return true
		}),
]
