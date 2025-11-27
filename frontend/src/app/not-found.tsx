import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Float from '@/components/animations/Float' // Reuse your Float component
import { Home, Cat } from 'lucide-react'

export default function NotFound() {
	return (
		<div className="min-h-screen w-full bg-[#050B14] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden font-sans text-white">
			{/* --- BACKGROUND EFFECTS --- */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* A dark "Black Hole" effect in the center */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[100px]" />

				{/* Floating Debris (CSS Animation) */}
				<div className="absolute top-20 left-20 w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
				<div className="absolute bottom-40 right-20 w-3 h-3 bg-gray-700 rounded-full animate-bounce duration-[4s]" />
				<div className="absolute top-1/2 right-10 text-gray-800 text-4xl opacity-20 rotate-12">
					?
				</div>
				<div className="absolute bottom-10 left-1/3 text-gray-800 text-6xl opacity-20 -rotate-12">
					404
				</div>
			</div>

			{/* --- CONTENT --- */}
			<div className="relative z-10 max-w-lg">
				{/* Glitching 404 Text */}
				<div className="relative font-outfit font-black text-9xl tracking-tighter mb-6 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600 select-none">
					<span className="relative inline-block">
						4{/* The Zero is the Mascot */}
						<span className="inline-block mx-2 text-violet-500 relative -top-2">
							<Float delay={0}>
								<div className="relative">
									<span className="absolute inset-0 blur-xl bg-violet-600/50 rounded-full"></span>
									<div className="w-24 h-24 rounded-full border-4 border-violet-500 flex items-center justify-center bg-[#050B14] relative z-10">
										<Cat
											size={48}
											className="text-violet-300"
										/>
									</div>
								</div>
							</Float>
						</span>
						4
					</span>
				</div>

				<h2 className="text-3xl md:text-4xl font-bold mb-4 font-outfit">
					Lost in the Void?
				</h2>

				<p className="text-gray-400 mb-8 text-lg font-serif leading-relaxed">
					It seems this part of the Lexicon has been consumed by{' '}
					<span className="text-red-400 italic">The Silence</span>. Or
					maybe you just typed the coordinates wrong.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Link href="/">
						<Button
							size="lg"
							className="h-12 px-8 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all hover:scale-105"
						>
							<Home size={18} className="mr-2" /> Return to Base
						</Button>
					</Link>
				</div>
			</div>

			{/* Footer Hash Code decoration */}
			<div className="absolute bottom-8 text-xs font-mono text-gray-600">
				ERROR_CODE: LEXICON_MEMORY_NOT_FOUND_0x404
			</div>
		</div>
	)
}
