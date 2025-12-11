'use client'

import RegisterArtwork from '@/components/pages/auth/register/Artwork'
import RegisterFrom from '@/components/pages/auth/register/From'

export default function RegisterPage() {
	return (
		<div className="min-h-screen w-full grid lg:grid-cols-2 bg-[#0F172A] text-white font-sans overflow-hidden">
			<RegisterArtwork />
			<RegisterFrom />
		</div>
	)
}
