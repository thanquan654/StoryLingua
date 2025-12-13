import type { User } from '../../../generated/prisma/index.js'
import { prisma } from '../../config/prisma.js'

export const getProfileById = async (
	userId: string,
): Promise<Omit<User, 'passwordHash'> | null> => {
	const userProfile = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!userProfile) return null

	const { passwordHash, ...userWithoutPassword } = userProfile
	return userWithoutPassword
}
