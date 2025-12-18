import type {
	User,
	UserAppearance,
	UserProfile,
} from '../../../generated/prisma/index.js'
import { prisma } from '../../config/prisma.js'

export const getProfileById = async (
	userId: string,
): Promise<{
	user: Omit<User, 'passwordHash' | 'isActive'>
	profile: UserProfile | null
	userAppearance: UserAppearance | null
} | null> => {
	const userProfile = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			profile: true,
			userAppearance: true,
		},
	})

	if (!userProfile) return null

	const {
		passwordHash,
		isActive,
		profile,
		userAppearance,
		...userWithoutPassword
	} = userProfile

	return { user: userWithoutPassword, profile, userAppearance }
}
