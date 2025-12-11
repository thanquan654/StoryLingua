import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Lora, Nunito } from 'next/font/google'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
	? `https://${process.env.NEXT_PUBLIC_APP_URL}`
	: 'http://localhost:3000'

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),

	// 2. Smart Title Template
	title: {
		default: 'StoryLingua - Master English through Context',
		template: '%s | StoryLingua',
	},

	description:
		'Elevate your English vocabulary and language skills with StoryLingua. The interactive platform designed for true mastery.',

	keywords: [
		'Learn English',
		'Vocabulary Builder',
		'StoryLingua',
		'English Mastery',
		'ESL',
		'Language Learning',
	],

	authors: [{ name: 'StoryLingua Team', url: baseUrl }],
	creator: 'StoryLingua',

	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: '/',
		siteName: 'StoryLingua',
		title: 'StoryLingua - Level Up Your English',
		description:
			'Join thousands of learners mastering English through stories and context.',
		images: [
			{
				url: '/og-banner.jpg',
				width: 1200,
				height: 630,
				alt: 'StoryLingua Application Preview',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'StoryLingua - Master English through Context',
		description:
			'Elevate your English vocabulary and language skills with StoryLingua.',
		images: ['/og-banner.jpg'],
	},

	icons: {
		icon: '/favicon.ico',
		shortcut: '/app-icon.png',
		apple: '/app-icon.png',
	},

	robots: {
		index: true,
		follow: true,
	},
}

const nunito = Nunito({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-nunito',
})

const lora = Lora({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-lora',
})

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" dir="ltr">
			<head>
				<meta name="apple-mobile-web-app-title" content="StoryLingua" />
			</head>
			<body className={`${nunito.variable} ${lora.variable}`}>
				{children}
			</body>
		</html>
	)
}
