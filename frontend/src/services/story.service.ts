import { apiClient } from '@/lib/apiClient'
import { APIResponse } from '@/types/common'
import { Story } from '@/types/story'

export const storyService = {
	getAllStories: async (
		accessToken: string | undefined,
		filter: {
			level?: string
			genre?: string
			page?: number
		},
	) => {
		let headers = {}
		if (accessToken) {
			headers = { Authorization: `Bearer ${accessToken}` }
		}
		const params = new URLSearchParams(
			filter as Record<string, string>,
		).toString()

		return apiClient<APIResponse<{ stories: Story[] }>>(
			`/stories?${params}`,
			{
				method: 'GET',
				headers,
			},
		)
	},
}
