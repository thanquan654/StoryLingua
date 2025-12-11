import RegisterArtwork from '@/components/pages/auth/register/Artwork'
import RegisterFrom from '@/components/pages/auth/register/From'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Register',
	description:
		'Welcome to StoryLingua. Register to access your dashboard and continue your English mastery journey today.',
}

export default function RegisterPage() {
	return (
		<div className="min-h-screen w-full grid lg:grid-cols-2 bg-[#0F172A] text-white font-sans overflow-hidden">
			<RegisterArtwork />
			<RegisterFrom />
		</div>
	)
}
