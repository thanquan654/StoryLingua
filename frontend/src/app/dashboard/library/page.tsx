import { storyService } from '@/services/story.service'
import { BookOpen, Edit, Grid2X2, Play, Search } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

const books = [
	{
		id: 1,
		title: 'Cyberpunk Saigon',
		author: 'Neon Writer',
		genre: 'Sci-Fi',
		progress: 65,
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUbjruCLgT6NZnU9Bx0Q1q22PyKd0o6_soZuGgwYYMnxtRbUZooMh3P5WvwKTFgBOr9Ya8H_cVQswFcNNcQ2XfaS--a1aS-3ZkskYT1klhR9e77aNff40Ksj-LTBFE8gzjTVf3GseOo6YqkDZAaiT_e8RCyl4H7M0_1u1uCOYWfSVGFt020kXDbUw-iAqQWlQG91UxorIDJ2W7ZztWAiVayiPl59OU3JTkPvvhkkBqixULzzqqrvdH-7DqZDmdgsDDgNbG72eBolc',
	},
	{
		id: 2,
		title: 'Chronicles of Light',
		author: 'Elena Moon',
		genre: 'Fantasy',
		progress: 0,
		cover: 'https://picsum.photos/300/450?random=2',
	},
	{
		id: 3,
		title: 'The Quantum Thief',
		author: 'Rajiv S.',
		genre: 'Sci-Fi',
		progress: 12,
		cover: 'https://picsum.photos/300/450?random=3',
	},
	{
		id: 4,
		title: 'Lost in Hanoi',
		author: 'Tran B.',
		genre: 'Mystery',
		progress: 0,
		cover: 'https://picsum.photos/300/450?random=4',
	},
	{
		id: 5,
		title: "Dragon's Ember",
		author: 'Fire Keeper',
		genre: 'Fantasy',
		progress: 88,
		cover: 'https://picsum.photos/300/450?random=5',
	},
	{
		id: 6,
		title: 'Silicon Soul',
		author: 'AI Dreamer',
		genre: 'Sci-Fi',
		progress: 0,
		cover: 'https://picsum.photos/300/450?random=6',
	},
	{
		id: 7,
		title: 'Whispers of the Old Quarter',
		author: 'Nguyen V.',
		genre: 'History',
		progress: 30,
		cover: 'https://picsum.photos/300/450?random=7',
	},
	{
		id: 8,
		title: 'Starlight Voyage',
		author: 'Cosmos',
		genre: 'Sci-Fi',
		progress: 0,
		cover: 'https://picsum.photos/300/450?random=8',
	},
]

export default async function LibraryPage() {
	const token = (await cookies()).get('accessToken')?.value

	const stories = await storyService
		.getAllStories(token, {
			page: 1,
		})
		.catch(() => {
			return []
		})

	console.log('🚀 ~ stories:', stories)

	return (
		<div className="bg-[#0F172A] font-display text-white antialiased overflow-hidden h-screen flex flex-col">
			<header className="px-5 md:px-8 pt-12 md:pt-8 pb-4 flex flex-col gap-4 bg-[#0F172A] z-10 sticky top-0 border-b border-white/5 md:border-none">
				<div className="flex items-center justify-between">
					<h1 className="text-[28px] md:text-3xl font-bold tracking-tight text-white leading-tight font-serif">
						The Grand Library
					</h1>
					<div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#1E293B] border border-white/10 overflow-hidden flex items-center justify-center shrink-0 cursor-pointer hover:border-purple-500/50 transition-colors">
						<div
							className="bg-cover bg-center w-full h-full"
							style={{
								backgroundImage:
									'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAC0qjdXDJmCzinIIbJ9Ea0N16Iup9MWWKbsm-aA2c7k5kbw7dnacc98MAwp1QCFBdTehR3YZv14uEo1jm9UY8gfPEhRfU91pIEoYCYlPOY4B3kn-pUIqyUBZR8F8YXL0uJmdwsMid91pYRRkFtppuUFSru-x_1ZBAQ4E0sZ4qm9MKoz21i2PGONSWCAykNU7LBUGq6zo9SigxSFqUsIOY8ZeJtcOobtiqcoi9A7EwwoCVj6VLbCuvlstTg9nxVeAfIwafLCMJ1Xko")',
							}}
						></div>
					</div>
				</div>
				<div className="relative group max-w-xl">
					<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
						<span className="material-symbols-outlined text-slate-400 group-focus-within:text-purple-400 transition-colors">
							<Search width={20} height={20} />
						</span>
					</div>
					<input
						className="block w-full rounded-xl border-0 py-3.5 pl-11 pr-4 bg-[#1E293B] text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-shadow"
						placeholder="Find titles, authors, or genres..."
						type="text"
					/>
				</div>
			</header>

			<main className="flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-8 relative px-5 md:px-8">
				{/* Responsive Filter Bar */}
				<div className="sticky top-0 z-20 bg-[#0F172A]/95 backdrop-blur-sm -mx-5 px-5 md:mx-0 md:px-0 md:bg-transparent md:static mb-4 md:mb-6">
					<nav className="-mb-px flex items-center justify-between md:justify-start md:gap-8 border-b border-white/5 md:border-none">
						<div className="flex space-x-6 md:space-x-8">
							<button className="border-purple-500 text-white whitespace-nowrap border-b-[3px] py-4 px-1 text-sm font-semibold tracking-wide bg-transparent cursor-pointer">
								Khám phá
							</button>
							<button className="border-transparent text-slate-400 whitespace-nowrap border-b-[3px] py-4 px-1 text-sm font-medium hover:text-white hover:border-white/20 transition-all bg-transparent cursor-pointer">
								Truyện của tôi
							</button>
						</div>
						{/* Desktop Filter Options */}
						<div className="hidden md:flex items-center gap-2 ml-auto">
							<span className="text-xs font-bold text-slate-500 uppercase mr-2">
								Sort by:
							</span>
							<select className="bg-[#1E293B] border-none text-xs text-white rounded-lg py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-purple-500 cursor-pointer">
								<option>Popular</option>
								<option>Newest</option>
								<option>Progress</option>
							</select>
						</div>
					</nav>
				</div>

				{/* Filter Chips */}
				<div className="flex gap-3 py-2 overflow-x-auto no-scrollbar mb-4 md:mb-8 md:flex-wrap">
					<button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-bold shadow-glow border border-white/10 shrink-0 hover:bg-purple-500 transition-colors">
						All
					</button>
					{[
						'Sci-Fi',
						'Fantasy',
						'History',
						'Educational',
						'Mystery',
						'Romance',
						'Horror',
					].map((g) => (
						<button
							key={g}
							className="px-4 py-2 rounded-full bg-[#1E293B] text-slate-300 border border-white/5 text-xs font-medium whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors shrink-0"
						>
							{g}
						</button>
					))}
				</div>

				{/* Featured Book */}
				<Link
					className="block relative w-full aspect-2/1 md:aspect-3/1 lg:aspect-4/1 rounded-2xl overflow-hidden shadow-lg group cursor-pointer mb-8 border border-white/5"
					href={`/dashboard/read`}
				>
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
						style={{
							backgroundImage:
								'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoNcdY467aqGrFav10N_yNHc2sDUayO5eIZIg4Jffv7m_zFuMWLaVJu5uvO9GqxwOUddOJ6qxHYY3Q71ewDX8pag-oOyiINTPTzyYv8CmpCATRmsnMkfWKManJdMKuuZc-nLPpN6oNUcLne5qCCgbTsBBjVSR27ODXuwsDyXbRMFqLvoRbAgjT516nN0Ep_2P5jWgMvtLgmuDLoTlEt2qZQzgFhIeH92P3kat8nznDt96R9IZF9u9ZeraPgnO7HIsPcmaLLsrtC3w")',
						}}
					></div>
					<div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent md:bg-linear-to-r md:from-[#0F172A] md:via-[#0F172A]/60 md:to-transparent"></div>
					<div className="absolute bottom-0 left-0 p-5 md:p-8 w-full md:w-2/3 lg:w-1/2 flex flex-col items-start">
						<div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/20 backdrop-blur-md text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-2 border border-purple-500/20">
							Featured
						</div>
						<h3 className="text-2xl md:text-4xl font-bold text-white mb-2 font-serif text-shadow-sm">
							The Alchemist&apos;s Secret
						</h3>
						<p className="text-slate-300 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-4 max-w-lg leading-relaxed">
							A journey into the unknown depths of ancient
							chemistry and forgotten spells. Discover the truth
							behind the Philosopher&apos;s Stone before it&apos;s
							too late.
						</p>
						<button className="hidden md:flex items-center gap-2 bg-white text-[#0F172A] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
							<span className="material-symbols-outlined filled text-lg">
								<Play />
							</span>
							Read Now
						</button>
					</div>
				</Link>

				<h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
					<span className="material-symbols-outlined text-purple-400">
						<Grid2X2 />
					</span>
					Your Collection
				</h2>

				{/* Library Grid */}
				<div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 lg:gap-8 pb-6">
					{books.map((book) => (
						<Link
							key={book.id}
							href={`/dashboard/read/${book.id}`}
							className="group relative cursor-pointer"
						>
							{/* Mobile View: List Item */}
							<div className="md:hidden flex gap-4 p-3 rounded-xl bg-[#1E293B] border border-white/5 hover:border-white/10 transition-colors shadow-sm">
								<div
									className="w-[70px] aspect-2/3 shrink-0 rounded-lg bg-cover bg-center shadow-md relative overflow-hidden"
									style={{
										backgroundImage: `url("${book.cover}")`,
									}}
								>
									{book.progress > 0 && (
										<div className="absolute bottom-0 left-0 w-full h-1 bg-black/50">
											<div
												className="h-full bg-purple-500"
												style={{
													width: `${book.progress}%`,
												}}
											></div>
										</div>
									)}
								</div>
								<div className="flex flex-col justify-center flex-1 min-w-0">
									<h4 className="text-base font-semibold text-white truncate pr-2 group-hover:text-purple-400 transition-colors font-serif">
										{book.title}
									</h4>
									<p className="text-xs text-slate-400 mb-1">
										{book.author}
									</p>
									<p className="text-xs text-slate-500 line-clamp-2 mb-2">
										Neon lights, flying motorbikes, and a
										mystery...
									</p>
									<div className="flex items-center gap-2 mt-auto">
										<span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[10px] font-medium border border-white/5">
											{book.genre}
										</span>
										{book.progress > 0 && (
											<span className="text-[10px] text-green-400 font-bold">
												{book.progress}%
											</span>
										)}
									</div>
								</div>
							</div>

							{/* Desktop View: Grid Card */}
							<div className="hidden md:block aspect-2/3 rounded-xl relative overflow-hidden shadow-xl bg-[#1E293B] group-hover:shadow-purple-500/20 group-hover:-translate-y-2 transition-all duration-500">
								<div
									className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
									style={{
										backgroundImage: `url("${book.cover}")`,
									}}
								></div>
								{/* Gradient Overlay */}
								<div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

								{/* Progress Bar (Desktop) */}
								{book.progress > 0 && (
									<div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800 z-10">
										<div
											className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
											style={{
												width: `${book.progress}%`,
											}}
										></div>
									</div>
								)}

								{/* Hover Interaction Overlay */}
								<div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
									<span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2 border border-purple-500/30 px-2 py-1 rounded">
										{book.genre}
									</span>
									<h4 className="text-lg font-bold text-white mb-1 font-serif leading-tight">
										{book.title}
									</h4>
									<p className="text-xs text-slate-400 mb-4">
										{book.author}
									</p>
									<p className="text-xs text-slate-300 mb-6 line-clamp-3 leading-relaxed">
										Dive into this immersive world.
										Experience the story like never before
										with AI narration.
									</p>
									<button className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
										<span className="material-symbols-outlined text-sm filled">
											<BookOpen />
										</span>
										{book.progress > 0
											? 'Continue'
											: 'Read Now'}
									</button>
								</div>
							</div>
						</Link>
					))}
				</div>
			</main>

			{/* Mobile FAB - Hidden on Desktop */}
			<Link
				href={'/dashboard/create'}
				className="md:hidden fixed bottom-24 right-5 h-14 w-14 bg-purple-600 text-white rounded-2xl shadow-glow-strong flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40 group"
			>
				<span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform">
					<Edit />
				</span>
			</Link>
		</div>
	)
}
