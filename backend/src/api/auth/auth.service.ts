import type { User } from '../../../generated/prisma/index.js'
import { prisma } from '../../config/prisma.js'
import bcrypt from 'bcryptjs'

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
		'id' | 'createdAt' | 'updatedAt' | 'passwordHash' | 'role'
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
		},
	})
}
