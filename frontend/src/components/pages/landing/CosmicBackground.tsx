import { Star } from 'lucide-react'

export default function CosmicBackground() {
	return (
		<div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
			{/* Nebula Blobs */}
			<div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse duration-[4s]" />
			<div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse duration-[6s]" />
			<div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />

			{/* Tiny Stars (CSS Simulation) */}
			<div className="absolute top-10 left-10 text-white/20 animate-ping duration-[3s]">
				<Star size={4} fill="currentColor" />
			</div>
			<div className="absolute top-40 right-20 text-white/30 animate-pulse duration-[2s]">
				<Star size={6} fill="currentColor" />
			</div>
			<div className="absolute bottom-20 left-1/3 text-white/10 animate-bounce duration-[5s]">
				<Star size={3} fill="currentColor" />
			</div>
		</div>
	)
}
