import { ArrowRight, Star, Sword, Heart, Search, Zap } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'

// Mock book data
const BOOKS = [
	{
		id: 1,
		title: 'The Neon Detective',
		genre: 'Cyberpunk',
		level: 'B2',
		desc: 'Unravel the mystery in Tokyo 2077.',
		icon: Search,
		color: 'from-pink-500 to-violet-600',
		shadow: 'shadow-pink-500/20',
	},
	{
		id: 2,
		title: 'Kingdom of Ash',
		genre: 'Fantasy',
		level: 'C1',
		desc: 'The ultimate battle for the throne.',
		icon: Sword,
		color: 'from-amber-500 to-orange-700',
		shadow: 'shadow-amber-500/20',
	},
	{
		id: 3,
		title: 'Coffee & Serendipity',
		genre: 'Romance',
		level: 'A2',
		desc: 'Love begins with a wrong Latte.',
		icon: Heart,
		color: 'from-rose-400 to-red-500',
		shadow: 'shadow-rose-500/20',
	},
	{
		id: 4,
		title: 'Code Whispers',
		genre: 'Sci-Fi',
		level: 'B1',
		desc: 'When AI starts to lie.',
		icon: Zap,
		color: 'from-emerald-400 to-teal-600',
		shadow: 'shadow-emerald-500/20',
	},
]

export default function LibraryPreview() {
	return (
		<section className="py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
					<FadeIn>
						<h2 className="text-4xl md:text-5xl font-bold font-outfit">
							Choose Your <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
								Adventure
							</span>
						</h2>
					</FadeIn>

					<FadeIn delay={0.2}>
						<a
							href="#"
							className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
						>
							View full library{' '}
							<ArrowRight
								size={18}
								className="group-hover:translate-x-1 transition-transform"
							/>
						</a>
					</FadeIn>
				</div>

				{/* Book Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{BOOKS.map((book, idx) => (
						<FadeIn key={book.id} delay={0.1 * idx}>
							<div
								className={`group relative aspect-2/3 rounded-2xl bg-linear-to-br ${book.color} p-1 ${book.shadow} shadow-2xl cursor-pointer hover:-translate-y-3 transition-all duration-500`}
							>
								{/* Inner Card Content */}
								<div className="absolute inset-0.5 bg-[#0A0F18] rounded-[14px] p-5 flex flex-col justify-between overflow-hidden">
									{/* Decorative background blob inside card */}
									<div
										className={`absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br ${book.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
									/>

									{/* Top Badges */}
									<div className="flex justify-between items-start relative z-10">
										<span className="text-[10px] font-bold uppercase tracking-widest py-1 px-2 rounded bg-white/5 text-white/70 border border-white/5">
											{book.genre}
										</span>
										<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
											<book.icon size={14} />
										</div>
									</div>

									{/* Middle Title */}
									<div className="relative z-10 mt-4">
										<h3 className="text-2xl font-bold font-outfit leading-tight text-white mb-2 group-hover:text-amber-200 transition-colors">
											{book.title}
										</h3>
										<p className="text-xs text-gray-400 line-clamp-2">
											{book.desc}
										</p>
									</div>

									{/* Bottom Info */}
									<div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 relative z-10">
										<div className="flex items-center gap-1 text-amber-400">
											<Star
												size={12}
												fill="currentColor"
											/>
											<span className="text-xs font-bold">
												4.8
											</span>
										</div>
										<div className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white border border-white/10">
											Level {book.level}
										</div>
									</div>

									{/* Hover Action (Overlay) */}
									<div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-20">
										<button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
											Read Now
										</button>
									</div>
								</div>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	)
}
