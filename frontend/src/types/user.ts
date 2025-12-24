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

export type Profile = {
	userId: string
	level: number
	currentXp: number
	gold: number
	streakCount: number
	lastStudyDate: Date | null
	energy: number
	lastEnergyUpdate: string
}

export type UserAppearance = {
	userId: string
	avatarFrameId: string | null
	mascotSkinId: string | null
	flashcardThemeId: string | null
	collectionFrameId: string | null
}

export type GetProfileApiResponse = {
	user: User
	profile: Profile
	userAppearance: UserAppearance
}
