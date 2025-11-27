import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import type { User } from '../../../generated/prisma/index.js'
import envVar from '../../config/envVar.js'
import { prisma } from '../../config/prisma.js'

const JWT_SECRET = envVar.jwtSecret

/**
 * Generates an access token for a given user.
 * @param user - The user object for whom to generate the access token.
 * @returns The generated access token.
 */
export const generateAccessToken = (user: User) => {
	const payload = { userId: user.id, email: user.email }

	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: '15m',
	})
}

/**
 * Generates a refresh token for a given user ID.
 * @param userId - The ID of the user for whom to generate the refresh token.
 * @returns The generated refresh token.
 */
export const generateRefreshToken = async (userId: string) => {
	const refreshToken = crypto.randomBytes(32).toString('hex')

	const hashedToken = crypto
		.createHash('sha256')
		.update(refreshToken)
		.digest('hex')

	const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)

	await prisma.refreshToken.create({
		data: {
			userId,
			hashedToken,
			expiresAt,
		},
	})

	return refreshToken
}
