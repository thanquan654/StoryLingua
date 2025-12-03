import { apiClient } from '@/lib/apiClient'
import { LoginRequest, LoginResponse } from '@/types/auth'
import { APIResponse } from '@/types/common'

export const authService = {
	login: async (payload: LoginRequest) => {
		return apiClient<APIResponse<LoginResponse>>('/auth/login', {
			method: 'POST',
			body: JSON.stringify(payload),
		})
	},
}
