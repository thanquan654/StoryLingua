import { User } from '@/types/user'

export type LoginRequest = {
	email: string
	password: string
}

export type LoginResponse = {
	user: User
	token: string
}

export type RegisterRequest = {
	displayName: string
	email: string
	password: string
	confirmPassword: string
}

export type RegisterResponse = {
	user: User
	token: string
}
