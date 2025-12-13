import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import envVar from '../../config/envVar.js'

export const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}

	return res.status(400).json({ errors: errors.array() })
}

interface UserPayload {
	userId: string
	email: string
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload
		}
	}
}

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers['authorization']

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({
				message: 'Access denied. No token provided or invalid format.',
			})
		}

		const token = authHeader.split(' ')[1]

		if (!token) {
			return res.status(401).json({
				message: 'Access denied. No token provided or invalid format.',
			})
		}

		// Verify token
		const decoder = jwt.verify(token, envVar.jwtSecret) as UserPayload

		req.user = decoder

		next()
	} catch (error) {
		return res.status(403).json({ message: 'Invalid or expired token.' })
	}
}
