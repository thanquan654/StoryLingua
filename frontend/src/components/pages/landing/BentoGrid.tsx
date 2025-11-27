import FadeIn from '@/components/animations/FadeIn'
import { BookOpen, BrainCircuit, Gamepad2 } from 'lucide-react'

export default function BentoGrid() {
	return (
		<section
			id="features"
			className="max-w-7xl mx-auto px-6 py-20 relative"
		>
			<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-violet-900/20 to-transparent opacity-30 pointer-events-none" />

			<FadeIn>
				<h2 className="text-4xl md:text-6xl font-bold text-center mb-20 font-outfit">
					Supercharge Your{' '}
					<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">
						Vocabulary
					</span>
				</h2>
			</FadeIn>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
				{/* Feature 1: AI Studio */}
				<FadeIn
					delay={0.2}
					className="md:col-span-1 relative group overflow-hidden rounded-4xl bg-[#0A1120] border border-white/5 hover:border-violet-500/50 transition-all duration-500 shadow-2xl"
				>
					<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
					<div className="absolute -right-20 -top-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[80px] group-hover:bg-violet-600/30 transition-all" />

					<div className="p-10 h-full flex flex-col justify-between relative z-10">
						<div>
							<div className="flex items-center gap-4 mb-6">
								<div className="w-14 h-14 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform p-2">
									<BrainCircuit size={28} />
								</div>
								<h3 className="text-3xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors">
									Your Story, Your Level
								</h3>
							</div>
							<p className="text-gray-400 max-w-md text-lg leading-relaxed">
								From Cyberpunk mysteries to Medieval fantasies.
								Read stories generated specifically for your
								vocabulary level.
							</p>
						</div>
						<div className="mt-8">
							<div className="p-4 bg-black/50 rounded-xl border border-white/10 font-mono text-sm text-green-400 overflow-hidden">
								<div className="animate-pulse flex gap-2">
									<span>&gt;</span> Generating new chapter...
									<span className="w-2 h-4 bg-green-400 animate-blink" />
								</div>
							</div>
						</div>
					</div>
				</FadeIn>

				{/* Feature 2: Context */}
				<FadeIn
					delay={0.3}
					className="md:col-span-1 relative group overflow-hidden rounded-4xl bg-[#0A1120] border border-white/5 hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
				>
					<div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
					<div className="p-10 h-full flex flex-col relative z-10">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:rotate-12 transition-transform p-4">
								<BookOpen size={28} />
							</div>
							<h3 className="text-3xl font-bold">
								Frictionless Learning
							</h3>
						</div>
						<p className="text-gray-400 max-w-md text-lg leading-relaxed mb-4">
							Don&apos;t break the flow. Tap any word to see its
							meaning in that specific context, then keep reading.
						</p>
						<div className="flex-1 bg-[#050B14] rounded-xl p-6 border border-white/5 flex flex-col justify-center group-hover:border-blue-500/30 transition-colors">
							<div className="text-gray-300 font-serif text-lg">
								&quot;He sat on the{' '}
								<span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded decoration-wavy cursor-help">
									bank
								</span>
								.&quot;
							</div>
							<div className="mt-3 text-xs text-gray-500 flex justify-between items-center">
								<span>Meaning: Bờ sông</span>
								<div className="w-2 h-2 bg-green-500 rounded-full" />
							</div>
						</div>
					</div>
				</FadeIn>

				{/* Feature 3: Gamification */}
				<FadeIn
					delay={0.4}
					className="md:col-span-2 relative group overflow-hidden rounded-4xl bg-linear-to-r from-[#0A1120] to-[#0F172A] border border-white/5 hover:border-amber-500/50 transition-all duration-500 shadow-2xl"
				>
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('/grid.svg')] opacity-10" />

					<div className="p-10 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
						<div className="text-left md:max-w-lg">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform p-4">
									<Gamepad2 size={28} />
								</div>
								<h3 className="text-3xl font-bold">
									Mastery is the Mission
								</h3>
							</div>
							<p className="text-gray-400 text-lg leading-relaxed">
								Earn XP for every chapter read. Collect unique
								visual cards for difficult words and build your
								legendary vocabulary deck.
							</p>
						</div>

						{/* Cards Animation */}
						<div className="flex -space-x-6 perspective-1000">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className={`w-32 h-44 rounded-xl border-2 border-gray-800 bg-gray-800 shadow-2xl transform transition-all duration-500 hover:-translate-y-6 hover:rotate-0 rotate-${
										(i - 2) * 10
									} hover:z-50`}
									style={{
										backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)`,
									}}
								>
									<div className="w-full h-full flex items-center justify-center">
										<span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">
											{i === 1
												? '🛡️'
												: i === 2
												? '⚔️'
												: '🔮'}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</FadeIn>
			</div>
		</section>
	)
}
