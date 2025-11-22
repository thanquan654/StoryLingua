import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'StoryLingua',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" dir="ltr">
			<head>
				<meta name="apple-mobile-web-app-title" content="StoryLingua" />
			</head>
			<body>{children}</body>
		</html>
	)
}
