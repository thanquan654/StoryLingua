import { ApiError, ErrorResponse } from '@/types/common'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

type FetchOptions = RequestInit & {
	header?: Record<string, string>
}

export const apiClient = async <T>(
	endpoint: string,
	options?: FetchOptions,
): Promise<T> => {
	const headers = {
		'Content-Type': 'application/json',
		...options?.headers,
	}

	console.log(`API: ${BASE_URL}${endpoint}`)

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		...options,
		headers,
	})

	if (!res.ok) {
		let errorData: ErrorResponse

		try {
			errorData = await res.json()
		} catch {
			errorData = {
				message: 'Internal Server Error',
			}
		}

		// 3. Ném ra lỗi ApiError có gắn kèm Status Code
		throw new ApiError(res.status, errorData)
	}

	return res.json() as Promise<T>
}
