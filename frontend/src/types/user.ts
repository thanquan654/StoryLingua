type UserRole = 'USER' | 'ADMIN'

export type User = {
	id: string
	displayName: string
	email: string
	googleId?: string
	avatar?: string
	role: UserRole
	createdAt: string
}
