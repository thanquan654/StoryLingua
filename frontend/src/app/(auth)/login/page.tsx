import type { Metadata } from 'next'
import LoginArtwork from '@/components/pages/auth/login/Artwork'
import LoginForm from '@/components/pages/auth/login/Form'

export const metadata: Metadata = {
	title: 'Log In',
	description:
		'Welcome back to StoryLingua. Log in to access your dashboard and continue your English mastery journey today.',
}

export default function LoginPage() {
	return (
		<div className="min-h-screen w-full grid lg:grid-cols-2 bg-[#0F172A] text-white font-sans overflow-hidden">
			<LoginForm />
			<LoginArtwork />
		</div>
	)
}
