import type { NextFunction, Request, Response } from 'express'
import type { User } from '../../../generated/prisma/index.js'
import bcrypt from 'bcryptjs'
import {
	createUser,
	deleteRefreshToken,
	findRefreshToken,
	findUserByEmail,
} from './auth.service.js'
import { generateAccessToken, generateRefreshToken } from './auth.util.js'

/**
 * Generates tokens, sets the refresh token cookie, and sends the successful auth response.
 */
const sendAuthResponse = async (
	res: Response,
	user: User,
	statusCode: number,
	message: string,
) => {
	const accessToken = generateAccessToken(user)
	const refreshToken = await generateRefreshToken(user.id)

	return res.status(statusCode).json({
		message,
		data: { accessToken, refreshToken },
	})
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body

	try {
		const user = await findUserByEmail(email)
		if (!user) {
			return res
				.status(401)
				.json({ message: 'Email or Password are incorrect' })
		}

		if (!user.passwordHash) {
			return res
				.status(401)
				.json({ message: 'Email or Password are incorrect' })
		}

		const isPasswordMatch = await bcrypt.compare(
			password,
			user.passwordHash!,
		)

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ message: 'Email or Password are incorrect' })
		}

		return await sendAuthResponse(res, user, 200, 'Login successfully')
	} catch (error) {
		next(error)
	}
}

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { displayName, email, password } = req.body

	try {
		const user = await findUserByEmail(email)

		if (user) {
			return res.status(400).json({
				message: 'Email already used',
			})
		}

		const newUser = await createUser({
			displayName,
			email,
			password,
			avatar: null,
			googleId: null,
		})

		return await sendAuthResponse(
			res,
			newUser,
			201,
			'Register successfully',
		)
	} catch (error) {
		next(error)
	}
}

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return res.status(200).json({
			message: 'Logout successfully',
		})
	}
	try {
		await deleteRefreshToken(refreshToken) // This line will not be reached if the refreshToken does not exist
		res.clearCookie('refreshToken')
		res.status(200).json({
			message: 'Logout successfully',
		})
	} catch (error) {
		next(error)
	}
}

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return res.status(401).json({
			message: 'Unauthorized',
		})
	}

	try {
		const existingRefreshToken = await findRefreshToken(refreshToken)

		if (!existingRefreshToken) {
			res.clearCookie('refreshToken')
			return res.status(403).json({
				message: 'Invalid refresh token',
			})
		}

		const { user } = existingRefreshToken

		// Refresh Token Rotation
		await deleteRefreshToken(refreshToken)
		const newRefreshToken = await generateRefreshToken(user.id)
		const newAccessToken = generateAccessToken(user)

		return res.status(200).json({
			message: 'Refresh token successfully',
			data: {
				refreshToken: newRefreshToken,
				accessToken: newAccessToken,
			},
		})
	} catch (error) {
		next(error)
	}
}
