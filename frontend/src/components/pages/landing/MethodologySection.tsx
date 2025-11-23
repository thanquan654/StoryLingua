import { X, Check, Brain, Ghost, Sparkles } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn' // Import your animation component

export default function MethodologySection() {
	return (
		<section className="py-24 relative overflow-hidden">
			{/* Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-900/20 blur-[100px] rounded-full pointer-events-none" />

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<FadeIn>
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">
							Why traditional learning <br />
							<span className="text-gray-500 line-through decoration-red-500/50 decoration-4">
								fails you
							</span>
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto text-lg">
							The human brain is designed to remember
							<span className="text-white font-bold">
								{' '}
								stories
							</span>
							, not isolated data.
						</p>
					</div>
				</FadeIn>

				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{/* --- THE OLD WAY (Flashcards) --- */}
					<FadeIn delay={0.2} className="h-full">
						<div className="h-full p-8 rounded-3xl border border-white/5 bg-[#0A0F18] opacity-70 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
							<div className="flex items-center gap-3 mb-6 text-gray-500">
								<Ghost size={24} />
								<h3 className="text-xl font-bold uppercase tracking-wider">
									The Old Way
								</h3>
							</div>

							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<div className="mt-1 min-w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
										<X size={14} strokeWidth={3} />
									</div>
									<div>
										<strong className="text-gray-300 block">
											Rote Memorization
										</strong>
										<p className="text-sm text-gray-500 mt-1">
											Trying to cram word lists without
											context, forgotten after 2 days.
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<div className="mt-1 min-w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
										<X size={14} strokeWidth={3} />
									</div>
									<div>
										<strong className="text-gray-300 block">
											Dry Grammar Exercises
										</strong>
										<p className="text-sm text-gray-500 mt-1">
											Filling in blanks with meaningless
											sentences like &quot;The cat is on
											the table&quot;.
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<div className="mt-1 min-w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
										<X size={14} strokeWidth={3} />
									</div>
									<div>
										<strong className="text-gray-300 block">
											Low Motivation
										</strong>
										<p className="text-sm text-gray-500 mt-1">
											Learning feels like a tiring
											obligation rather than a hobby.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</FadeIn>

					{/* --- THE STORYLINGUA WAY --- */}
					<FadeIn delay={0.4} className="h-full">
						<div className="h-full p-8 rounded-3xl border border-violet-500/30 bg-linear-to-b from-violet-950/20 to-[#0A0F18] shadow-[0_0_30px_rgba(124,58,237,0.1)] relative group overflow-hidden">
							{/* Decorative Gradient Line */}
							<div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 via-fuchsia-500 to-amber-500" />

							<div className="flex items-center gap-3 mb-6 text-violet-300">
								<Sparkles size={24} className="animate-pulse" />
								<h3 className="text-xl font-bold uppercase tracking-wider">
									The StoryLingua Way
								</h3>
							</div>

							<ul className="space-y-6">
								<li className="flex items-start gap-3">
									<div className="mt-1 min-w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.2)]">
										<Check size={14} strokeWidth={3} />
									</div>
									<div>
										<strong className="text-white block text-lg">
											Contextual Learning
										</strong>
										<p className="text-sm text-gray-400 mt-1">
											Encounter new words in thrilling
											situations. Your brain automatically
											&quot;pins&quot; meanings based on
											emotions.
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<div className="mt-1 min-w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.2)]">
										<Check size={14} strokeWidth={3} />
									</div>
									<div>
										<strong className="text-white block text-lg">
											Natural Grammar Absorption
										</strong>
										<p className="text-sm text-gray-400 mt-1">
											Absorb complex sentence structures
											through reading, similar to how you
											learned your native language.
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<div className="mt-1 min-w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.2)]">
										<Check size={14} strokeWidth={3} />
									</div>
									<div>
										<strong className="text-white block text-lg">
											Addictive Engagement
										</strong>
										<p className="text-sm text-gray-400 mt-1">
											You&apos;re not &quot;studying&quot;;
											you&apos;re uncovering who the culprit
											is in the next chapter.
										</p>
									</div>
								</li>
							</ul>

							{/* Floating Element */}
							<div className="absolute -bottom-10 -right-10 text-white/5 rotate-12 pointer-events-none">
								<Brain size={150} />
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	)
}
