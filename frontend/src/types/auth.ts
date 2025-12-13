import { z } from 'zod'

export type LoginRequest = {
	email: string
	password: string
}

export type AuthResponse = {
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

export const RegisterFormSchema = z
	.object({
		displayName: z
			.string()
			.min(4, 'Name must be at least 4 characters long')
			.max(32, 'Name is too long'),
		email: z.email({ message: 'Email is invalid' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' })
			.max(32, { message: 'Password is too long' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' })
			.max(32, { message: 'Password is too long' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

export type AuthFormState =
	| {
			errors?: {
				displayName?: string[]
				email?: string[]
				password?: string[]
				confirmPassword?: string[]
			}
			message?: string
			payload?: {
				displayName?: string
				email?: string
				password?: string
				confirmPassword?: string
			}
	  }
	| undefined
