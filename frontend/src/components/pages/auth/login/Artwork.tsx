import Image from 'next/image'

export default function LoginArtwork() {
	return (
		<div className="hidden lg:flex flex-col justify-center items-center relative bg-[#050B14] overflow-hidden border-l border-white/5">
			<div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10 mix-blend-overlay" />

			{/* Background Blobs */}
			<div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-3xl animate-pulse duration-1000" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />

			<div className="relative z-10 p-12 text-center max-w-lg">
				<div className="w-24 h-24 bg-linear-to-br from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/30  hover:rotate-3 hover:scale-105 transition-all duration-500 cursor-pointer">
					<Image
						src={'/app-icon.png'}
						alt="icon"
						width={160}
						height={160}
					/>
				</div>

				<h2 className="text-4xl font-bold font-outfit mb-6 text-white leading-tight">
					Level up your <br />
					<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
						English Mastery
					</span>
				</h2>

				<p className="text-gray-400 text-lg leading-relaxed font-serif italic">
					&quot;The limits of my language mean the limits of my
					world.&quot;
				</p>
				<div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-gray-500">
					<span className="w-8 h-px bg-gray-700" />
					<i>Ludwig Wittgenstein</i>
					<span className="w-8 h-px bg-gray-700" />
				</div>
			</div>
		</div>
	)
}
