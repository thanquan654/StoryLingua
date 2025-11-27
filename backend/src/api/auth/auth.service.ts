import type { User } from '../../../generated/prisma/index.js'
import { prisma } from '../../config/prisma.js'
import bcrypt from 'bcryptjs'

export const findUserByEmail = async (email: string): Promise<User | null> => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
	})
}

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
