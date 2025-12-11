import { z } from 'zod'

export type LoginRequest = {
	email: string
	password: string
}

export type LoginResponse = {
	accessToken: string
	refreshToken: string
}

export type RegisterRequest = {
	displayName: string
	email: string
	password: string
	confirmPassword: string
}

export type RegisterResponse = {
	accessToken: string
	refreshToken: string
}

export const LoginFormSchema = z.object({
	email: z.email({ message: 'Email is invalid' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long' })
		.max(32, { message: 'Password is too long' }),
})

export type AuthFormState =
	| {
			errors?: {
				email?: string[]
				password?: string[]
			}
			message?: string
			payload?: {
				email: string
			}
	  }
	| undefined
