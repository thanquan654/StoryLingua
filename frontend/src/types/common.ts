export type APIResponse<T> = {
	data: T
	msg: string
}

export type ErrorResponse = {
	message: string
	errors?: Record<string, string[]>
}

export class ApiError extends Error {
	status: number
	payload: ErrorResponse

	constructor(status: number, payload: ErrorResponse) {
		super(payload.message)
		this.status = status
		this.payload = payload
		this.name = 'ApiError'
	}
}
