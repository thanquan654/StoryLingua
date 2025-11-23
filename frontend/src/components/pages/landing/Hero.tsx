import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import Float from '@/components/animations/Float'
import {
	BookOpen,
	Zap,
	Gamepad2,
	ArrowRight,
	Sparkles,
	Cat,
} from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
	return (
		<section className="max-w-7xl mx-auto px-6 pt-20 pb-32 lg:pt-32 lg:pb-40 grid lg:grid-cols-2 gap-16 items-center">
			{/* Left Content */}
			<div className="space-y-8 text-center lg:text-left relative">
				{/* Decorative Line */}
				<div className="hidden lg:block absolute -left-8 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-800 to-transparent" />

				<FadeIn delay={0.1}>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-950/30 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-2 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.2)]">
						<Sparkles size={12} /> The Future of Learning
					</div>
				</FadeIn>

				<FadeIn delay={0.2}>
					<h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-outfit leading-[1.05] tracking-tight">
						Forget Memorizing.
						<br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-fuchsia-400 to-amber-300 animate-gradient-x">
							Start Living the Language.
						</span>
					</h1>
				</FadeIn>

				<FadeIn delay={0.3}>
					<p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
						Stop struggling with boring word lists. Immerse
						yourself in adventures where
						<span className="text-amber-400 font-bold">
							{' '}
							learning English feels like playing an RPG
						</span>
					</p>
				</FadeIn>

				<FadeIn
					delay={0.4}
					className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
				>
					{/* Shiny Button Effect */}
					<Link href={'/login'}>
						<Button
							size="lg"
							className="relative overflow-hidden h-16 px-10 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all hover:scale-105 group hover:cursor-pointer"
						>
							<span className="relative z-10 flex items-center gap-2">
								Start Reading for Free{' '}
								<ArrowRight size={20} />
							</span>
							<div className="absolute top-0 -left-full w-[50%] h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-700" />
						</Button>
					</Link>

					<Button
						size="lg"
						variant="outline"
						className="h-16 px-8 rounded-full border-gray-700 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-md hover:cursor-pointer"
					>
						Watch Trailer
					</Button>
				</FadeIn>
			</div>

			{/* Right Visual - Floating Mockup */}
			<FadeIn
				delay={0.5}
				direction="left"
				className="relative z-20"
			>
				<Float>
					<div className="relative mx-auto w-full max-w-[500px] aspect-4/5 rounded-[2.5rem] border border-white/10 bg-gray-900/50 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden group hover:border-violet-500/50 transition-colors duration-500">
						{/* Mockup Header */}
						<div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
							<div className="text-xs font-mono text-violet-400 flex items-center gap-2">
								<span className="w-2 h-2 bg-violet-500 rounded-full animate-ping" />{' '}
								LIVE SESSION
							</div>
							<div className="flex gap-1">
								{[1, 2, 3].map((i) => (
									<div
										key={i}
										className="w-1.5 h-1.5 rounded-full bg-gray-600"
									/>
								))}
							</div>
						</div>

						{/* Mockup Content */}
						<div className="flex-1 p-8 flex flex-col items-center justify-center relative">
							{/* Glow Effect behind cat */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-violet-600/30 rounded-full blur-[50px] group-hover:bg-violet-600/50 transition-all duration-500" />

							<Float delay={1}>
								<div className="w-32 h-32 bg-linear-to-b from-gray-800 to-black rounded-full flex items-center justify-center mb-6 border border-violet-500/30 shadow-lg relative z-10">
									<Cat
										size={64}
										className="text-violet-200 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
									/>
								</div>
							</Float>

							<div className="space-y-3 w-full max-w-xs relative z-10">
								<div className="h-2 w-20 bg-gray-700 rounded mx-auto mb-4" />
								<div className="p-5 bg-gray-800/80 rounded-2xl border border-white/5 text-center backdrop-blur-md hover:scale-105 transition-transform cursor-pointer">
									<p className="font-serif text-gray-200 text-lg leading-relaxed">
										&quot;The wizard cast a spell of{' '}
										<span className="text-amber-400 font-bold underline decoration-dashed decoration-amber-500/50 underline-offset-4">
											silence
										</span>
										.&quot;
									</p>
								</div>
							</div>
						</div>

						{/* Mockup Bottom Bar */}
						<div className="h-20 bg-black/40 border-t border-white/5 flex items-center justify-around px-4">
							<div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
								<BookOpen
									size={18}
									className="text-gray-400"
								/>
							</div>
							<div className="w-14 h-14 rounded-full bg-linear-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg -mt-8 border-4 border-[#0F172A]">
								<Zap size={24} className="text-white" />
							</div>
							<div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
								<Gamepad2
									size={18}
									className="text-gray-400"
								/>
							</div>
						</div>
					</div>
				</Float>

				{/* Floating Elements around */}
				<Float delay={2}>
					<div className="absolute top-20 -right-10 bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-xl rotate-12 opacity-80">
						<span className="text-2xl">🔥</span>
					</div>
				</Float>
				<Float delay={1.5}>
					<div className="absolute bottom-40 -left-10 bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-xl -rotate-6 opacity-80">
						<span className="text-2xl">💎</span>
					</div>
				</Float>
			</FadeIn>
		</section>
	)
}
