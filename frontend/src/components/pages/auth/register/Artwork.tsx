import { Check } from 'lucide-react'
import React from 'react'

export default function RegisterArtwork() {
	return (
		<div className="hidden lg:flex flex-col justify-center items-center relative bg-[#050B14] overflow-hidden border-r border-white/5">
			<div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10 mix-blend-overlay" />

			{/* Background Blobs */}
			<div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-3xl animate-pulse duration-[4s]" />
			<div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl" />

			<div className="relative z-10 text-left max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000">
				<h2 className="text-5xl font-bold font-outfit mb-8 text-transparent bg-clip-text bg-linear-to-br from-white to-gray-400 leading-tight">
					Forget Memorizing. Start Living the Language.
				</h2>

				{/* Benefit List  */}
				<div className="space-y-4 text-left">
					{[
						'Unlimited AI Story Generation',
						'Personalized Vocabulary Deck',
						'Smart Memory Tracking',
						'Addictive Gamification',
					].map((item, idx) => (
						<div
							key={idx}
							className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group"
						>
							<div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
								<Check size={16} strokeWidth={3} />
							</div>
							<span className="text-gray-300 font-medium">
								{item}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
