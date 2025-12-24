import { storyService } from '@/services/story.service'
import { BookOpen, Clock, Edit, FileText, Grid2X2, Search } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

export default async function LibraryPage() {
	const token = (await cookies()).get('accessToken')?.value

	const stories = await storyService
		.getAllStories(token, {
			page: 1,
		})
		.then((res) => res.data.stories)
		.catch(() => {
			return []
		})

	return (
		<div className="bg-[#0F172A] font-display text-white antialiased overflow-hidden h-screen flex flex-col">
			<header className="px-5 md:px-8 pt-4 md:pt-8 pb-4 flex flex-col gap-4 bg-[#0F172A] z-10 sticky top-0 border-b border-white/5 md:border-none">
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

				<h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
					<span className="material-symbols-outlined text-purple-400">
						<Grid2X2 />
					</span>
					Your Collection
				</h2>

				{/* Library Grid */}
				{stories.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-slate-500">
						<span className="material-symbols-outlined text-5xl mb-4 opacity-20">
							library_books
						</span>
						<p className="text-lg font-medium">
							No stories were found that suited you, please try
							searching again.
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 lg:gap-8 pb-6">
						{stories.map((story) => (
							<Link
								key={story.id}
								href={`/dashboard/read/${story.id}`}
								className="group relative cursor-pointer"
							>
								{/* Mobile View: List Item */}
								<div className="md:hidden flex gap-4 p-3 rounded-xl bg-[#1E293B] border border-white/5 hover:border-purple-500/30 transition-all shadow-sm active:scale-[0.98]">
									<div className="w-[85px] aspect-2/3 shrink-0 rounded-lg relative overflow-hidden shadow-md">
										<Image
											src={
												story.coverImage ||
												'/placeholder-cover.png'
											}
											alt={story.title}
											fill
											className="object-cover"
										/>
										{/* Difficulty Badge on Mobile Image */}
										<div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-purple-600/90 text-[8px] font-bold text-white backdrop-blur-sm">
											{story.difficultyLevel}
										</div>
									</div>

									<div className="flex flex-col justify-between flex-1 min-w-0 py-1">
										<div>
											<h4 className="text-sm font-semibold text-white truncate pr-2 group-hover:text-purple-400 transition-colors font-serif">
												{story.title}
											</h4>
											<p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
												{story.rawContent?.substring(
													0,
													80,
												)}
												...
											</p>
										</div>

										<div className="flex items-center gap-3">
											<span className="flex items-center gap-1 text-slate-500 text-[10px]">
												<Clock size={12} />{' '}
												{story.readingTime}m
											</span>
											<span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[9px] font-medium border border-white/5 uppercase">
												{story.genre}
											</span>
											{story.isAiGenerated && (
												<span className="text-[9px] text-purple-400/80 font-medium ml-auto">
													AI ✨
												</span>
											)}
										</div>
									</div>
								</div>

								{/* Desktop View: Grid Card */}
								<div className="hidden md:block aspect-2/3 rounded-xl relative overflow-hidden shadow-xl bg-[#1E293B] group-hover:shadow-purple-500/20 group-hover:-translate-y-2 transition-all duration-500 border border-white/5">
									{/* Background Image */}
									<div
										className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
										style={{
											backgroundImage: story.coverImage
												? `url("${story.coverImage}")`
												: 'none',
										}}
									></div>

									{story.status !== 'PUBLISHED' && (
										<div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
											<span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md  text-white text-[10px] font-bold border border-white/10 shadow-lg">
												{story.status}
											</span>
										</div>
									)}

									{/* Static Info Badges (Visible before hover) */}
									<div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
										<span className="px-2 py-1 rounded-md bg-purple-600 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 shadow-lg">
											{story.difficultyLevel}
										</span>
									</div>

									{/* Gradient Overlay */}
									<div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

									{/* Content Info (Bottom of card) */}
									<div className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-transform duration-500 group-hover:translate-y-full">
										<h4 className="text-white font-serif font-bold text-sm leading-tight line-clamp-2 uppercase tracking-wide">
											{story.title}
										</h4>
									</div>

									{/* Hover Interaction Overlay */}
									<div className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-2 text-center z-20">
										<div className="flex items-center gap-2 mb-3">
											<span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest border border-purple-500/30 px-2 py-1 rounded">
												{story.genre}
											</span>
										</div>

										<h4 className="text-lg font-bold text-white mb-2 font-serif leading-tight">
											{story.title}
										</h4>

										{/* Quick Stats */}
										<div className="flex items-center gap-4 mb-4 text-slate-400 text-xs border-y border-white/5 py-2 w-full justify-center">
											<div className="flex items-center gap-1">
												<Clock
													size={14}
													className="text-purple-400"
												/>
												<span>
													{story.readingTime}m
												</span>
											</div>
											<div className="flex items-center gap-1">
												<FileText
													size={14}
													className="text-purple-400"
												/>
												<span>
													{story.wordCount} words
												</span>
											</div>
										</div>

										<p className="text-[11px] text-slate-400 mb-6 line-clamp-3 leading-relaxed italic">
											{story.rawContent?.substring(
												0,
												120,
											)}
											...
										</p>

										<button className="bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
											<BookOpen size={14} />
											Read Now
										</button>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
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
