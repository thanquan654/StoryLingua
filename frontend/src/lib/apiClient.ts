import { ApiError, ErrorResponse } from '@/types/common'

// Logic chọn Base URL
const isServer = typeof window === 'undefined'
const BASE_URL = isServer ? process.env.NEXT_PUBLIC_API_URL : '/api/proxy'

type FetchOptions = RequestInit & {
	header?: Record<string, string>
}

export const apiClient = async <T>(
	endpoint: string,
	options?: FetchOptions,
): Promise<T> => {
	const cleanEndpoint = endpoint.startsWith('/')
		? endpoint.slice(1)
		: endpoint
	const url = `${BASE_URL}/${cleanEndpoint}`

	const headers = {
		'Content-Type': 'application/json',
		...options?.headers,
	}

	console.log(`🚀 API [${isServer ? 'Server' : 'Client'}]: ${url}`)

	const res = await fetch(url, {
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

		throw new ApiError(res.status, errorData)
	}

	return res.json() as Promise<T>
}
