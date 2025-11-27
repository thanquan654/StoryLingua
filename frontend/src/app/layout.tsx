import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Lora, Nunito } from 'next/font/google'
import './globals.css'
import { domAnimation, LazyMotion } from 'framer-motion'

export const metadata: Metadata = {
	title: 'StoryLingua',
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
