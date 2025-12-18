import type { RefreshToken, User } from '../../../generated/prisma/index.js'
import { prisma } from '../../config/prisma.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

/**
 * Finds a user by their email address.
 * @param email - The email address of the user to find.
 * @returns A Promise that resolves to the user object if found, or null otherwise.
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
	})
}

/**
 * Creates a new user in the database.
 * @param userData - An object containing the user's display name, email, password (optional), avatar, and Google ID.
 * @returns A Promise that resolves to the newly created user object.
 */
export const createUser = async (
	userData: Omit<
		User,
		| 'id'
		| 'createdAt'
		| 'updatedAt'
		| 'passwordHash'
		| 'role'
		| 'isEmailVerified'
		| 'isActive'
	> & { password?: string },
): Promise<User> => {
	const { displayName, email, password, avatar, googleId } = userData

	const hashedPassword = password ? await bcrypt.hash(password, 10) : null

	return prisma.user.create({
		data: {
			displayName,
			email,
			passwordHash: hashedPassword,
			avatar,
			googleId,

			profile: {
				create: {
					level: 1,
					currentXp: 0,
					gold: 0,
					energy: 25,
				},
			},

			userAppearances: {
				create: {
					avatarFrameId: null,
					mascotSkinId: null,
				},
			},
		},
	})
}

/**
 * Finds a refresh token in the database and includes the associated user.
 * @param token - The raw refresh token string.
 * @returns A Promise that resolves to the RefreshToken object with the user included, or null if not found or expired.
 */
export const findRefreshToken = async (
	token: string,
): Promise<(RefreshToken & { user: User }) | null> => {
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	const refreshToken = await prisma.refreshToken.findUnique({
		where: {
			hashedToken,
		},
		include: {
			user: true,
		},
	})

	if (!refreshToken || refreshToken.expiresAt < new Date()) {
		return null
	}

	return refreshToken
}

/**
 * Deletes a refresh token from the database.
 * @param token - The raw refresh token string to delete.
 */
export const deleteRefreshToken = async (token: string): Promise<void> => {
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	await prisma.refreshToken.deleteMany({
		where: {
			hashedToken,
		},
	})
}
