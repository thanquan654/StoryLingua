'use server'

import { authService } from '@/services/auth.service'
import {
	AuthFormState,
	LoginFormSchema,
	RegisterFormSchema,
} from '@/types/auth'
import { ApiError } from '@/types/common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(
	_prevState: AuthFormState,
	loginFormData: FormData,
): Promise<AuthFormState> {
	const email = loginFormData.get('email') as string
	const password = loginFormData.get('password') as string

	const validatedFields = LoginFormSchema.safeParse({
		email,
		password,
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			payload: {
				email: email,
				password: password,
			},
		}
	}

	try {
		const res = await authService.login({ email, password })
		const { accessToken, refreshToken } = res.data

		const cookieStore = await cookies()

		cookieStore.set('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 15 * 60,
		})

		cookieStore.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		})
	} catch (error) {
		if (error instanceof ApiError) {
			if (error.status === 429) {
				return {
					message: 'Too Many Request, please try later',
					payload: {
						email: email,
						password: password,
					},
				}
			}
			return {
				message: error.message,
				payload: {
					email: email,
					password: password,
				},
			}
		}
		return { message: 'Unknown Error' }
	}

	redirect('/')
}

export async function registerAction(
	_prevState: AuthFormState,
	registerFormData: FormData,
) {
	const displayName = registerFormData.get('displayName') as string
	const email = registerFormData.get('email') as string
	const password = registerFormData.get('password') as string
	const confirmPassword = registerFormData.get('confirmPassword') as string

	const validatedFields = RegisterFormSchema.safeParse({
		displayName,
		email,
		password,
		confirmPassword,
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			payload: {
				displayName: displayName,
				email: email,
				password: password,
				confirmPassword: confirmPassword,
			},
		}
	}

	try {
		const res = await authService.register({
			displayName,
			email,
			password,
			confirmPassword,
		})
		const { accessToken, refreshToken } = res.data

		const cookieStore = await cookies()

		cookieStore.set('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 15 * 60,
		})

		cookieStore.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		})
	} catch (error) {
		if (error instanceof ApiError) {
			if (error.status === 429) {
				return { message: 'Too Many Request, please try later' }
			}
			return {
				message: error.message,
				payload: {
					displayName: displayName,
					email: email,
					password: password,
					confirmPassword: confirmPassword,
				},
			}
		}
		return { message: 'Unknown Error' }
	}

	redirect('/')
}
