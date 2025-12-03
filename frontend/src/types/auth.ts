import { User } from '@/types/user'

export type LoginRequest = {
	email: string
	password: string
}

export type LoginResponse = {
	user: User
	token: string
}
