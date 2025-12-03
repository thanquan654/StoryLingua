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
		const errorData = await res.json().catch(() => ({}))
		throw new Error(errorData.message || 'API Call Failed')
	}

	return res.json() as Promise<T>
}
