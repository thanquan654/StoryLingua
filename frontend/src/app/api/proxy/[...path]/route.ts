import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	return handler(req, params)
}

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	return handler(req, params)
}

async function handler(req: NextRequest, params: Promise<{ path: string[] }>) {
	const accessToken = (await cookies()).get('accessToken')?.value

	const path = (await params).path.join('/')
	const queryString = req.nextUrl.search

	const backendFullUrl = `${BACKEND_URL}/${path}${queryString}`

	console.log('🚀 ~ backendFullUrl:', backendFullUrl)

	const res = await fetch(backendFullUrl, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: req.method !== 'GET' ? req.body : undefined,
		cache: 'no-store',
		// @ts-expect-error Require in forward body
		duplex: 'half',
	})

	return new NextResponse(res.body, {
		status: res.status,
		statusText: res.statusText,
		headers: res.headers,
	})
}
