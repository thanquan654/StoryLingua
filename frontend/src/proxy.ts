import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const accessToken = request.cookies.get('accessToken')?.value

	const isPublicPath = pathname === '/login' || pathname === '/register'
	if (isPublicPath) {
		if (accessToken) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		}
		return NextResponse.next()
	}

	if (!accessToken) {
		const refreshToken = request.cookies.get('refreshToken')?.value

		if (refreshToken) {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
					{
						method: 'POST',
						headers: { Cookie: `refreshToken=${refreshToken}` },
					},
				)
				if (!res.ok) throw new Error('Refresh token failed')
				const data = await res.json()

				const response = NextResponse.next()

				response.cookies.set('accessToken', data.data.accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					path: '/',
					maxAge: 15 * 60 * 1000, // 15 minutes
				})
				response.cookies.set('refreshToken', data.data.refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					path: '/',
					maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
				})
				return response
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				const response = NextResponse.redirect(
					new URL('/login', request.url),
				)
				response.cookies.delete('accessToken')
				response.cookies.delete('refreshToken')
				return response
			}
		}

		return NextResponse.redirect(new URL('/login', request.url))
	}

	const headers = new Headers(request.headers)
	headers.set('x-current-path', request.nextUrl.pathname)
	return NextResponse.next({ headers })
}

export const config = {
	matcher: ['/dashboard/:path*', '/login', '/register'],
}
