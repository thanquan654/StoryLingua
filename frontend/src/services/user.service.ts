import { apiClient } from '@/lib/apiClient'
import { APIResponse } from '@/types/common'
import { User } from '@/types/user'

export const userService = {
	getMyProfile: async (accessToken: string | undefined) => {
		let headers = {}
		if (accessToken) {
			headers = { Authorization: `Bearer ${accessToken}` }
		}
		return apiClient<APIResponse<User>>('/users/me', {
			method: 'GET',
			headers,
		})
	},
}
