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
import envVar from '../../config/envVar.js'

/**
 * Generates tokens, sets the refresh token cookie, and sends the successful auth response.
 */
const sendAuthResponse = async (
	res: Response,
	user: User,
	statusCode: number,
	msg: string,
) => {
	const accessToken = generateAccessToken(user)
	const refreshToken = await generateRefreshToken(user.id)

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: envVar.nodeEnv === 'production',
		sameSite: 'none',
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
	})

	const { passwordHash, ...userWithoutPassword } = user
	return res.status(statusCode).json({
		msg,
		data: { user: userWithoutPassword, token: accessToken },
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
				.status(400)
				.json({ msg: 'Email or Password are incorrect' })
		}

		if (!user.passwordHash) {
			return res
				.status(400)
				.json({ msg: 'Email or Password are incorrect' })
		}

		const isPasswordMatch = await bcrypt.compare(
			password,
			user.passwordHash!,
		)

		if (!isPasswordMatch) {
			return res
				.status(400)
				.json({ msg: 'Email or Password are incorrect' })
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
				msg: 'Email already used',
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
			msg: 'Logout successfully',
		})
	}
	try {
		await deleteRefreshToken(refreshToken) // Sẽ không chạy đến đây nếu refreshToken không tồn tại
		res.clearCookie('refreshToken')
		res.status(200).json({
			msg: 'Logout successfully',
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
			msg: 'Unauthorized',
		})
	}

	try {
		const existingRefreshToken = await findRefreshToken(refreshToken)

		if (!existingRefreshToken) {
			res.clearCookie('refreshToken')
			return res.status(403).json({
				msg: 'Invalid refresh token',
			})
		}

		const { user } = existingRefreshToken

		// Refresh Token Rotation
		await deleteRefreshToken(refreshToken)
		const newRefreshToken = await generateRefreshToken(user.id)
		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: envVar.nodeEnv === 'production',
			sameSite: 'none',
			maxAge: 15 * 24 * 60 * 60 * 1000,
		})

		const newAccessToken = generateAccessToken(user)

		return res.status(200).json({
			msg: 'Refresh token successfully',
			data: {
				token: newAccessToken,
			},
		})
	} catch (error) {
		next(error)
	}
}
