import { Zap } from 'lucide-react'

export default function Footer() {
	return (
		<footer className="border-t border-white/5 py-12 bg-[#020408]">
			<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600">
				<div className="text-xl font-bold font-outfit flex items-center gap-2 text-gray-400">
					<Zap size={20} /> StoryLingua
				</div>
				<div className="text-sm">© 2025 by Than Quan.</div>
			</div>
		</footer>
	)
}
