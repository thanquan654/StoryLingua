import { apiClient } from '@/lib/apiClient'
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from '@/types/auth'
import { APIResponse } from '@/types/common'

export const authService = {
	login: async (payload: LoginRequest) => {
		return apiClient<APIResponse<LoginResponse>>('/auth/login', {
			method: 'POST',
			body: JSON.stringify(payload),
		})
	},

	register: async (payload: RegisterRequest) => {
		return apiClient<APIResponse<RegisterResponse>>('/auth/register', {
			method: 'POST',
			body: JSON.stringify(payload),
		})
	},

	logout: async (refreshToken: string | undefined) => {
		let headers = {}
		if (refreshToken) {
			headers = { Cookie: `refreshToken=${refreshToken}` }
		}
		return apiClient<APIResponse<RegisterResponse>>('/auth/logout', {
			method: 'POST',
			headers,
		})
	},

	refreshToken: async (refreshToken: string | undefined) => {
		let headers = {}
		if (refreshToken) {
			headers = { Cookie: `refreshToken=${refreshToken}` }
		}
		return apiClient<APIResponse<RegisterResponse>>('/auth/refresh-token', {
			method: 'POST',
			headers,
		})
	},
}
