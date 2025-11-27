import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className="relative z-50 border-b border-white/5 backdrop-blur-md bg-[#050B14]/50">
			<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
				<Link
					href={'/'}
					className="flex items-center gap-3 font-bold text-xl tracking-tight cursor-pointer group"
				>
					<div className="w-10 h-10 bg-linear-to-br  rounded-xl flex items-center justify-center  transition-all">
						<Image
							src={'/app-icon.png'}
							alt={'icon'}
							width={40}
							height={40}
						/>
					</div>
					<span className="font-outfit text-2xl bg-clip-text text-transparent bg-linear-to-r  from-white to-gray-400 ">
						StoryLingua
					</span>
				</Link>

				<div className="flex items-center gap-4">
					<span className="hidden lg:flex items-center gap-2 text-xs font-bold text-gray-500 border border-gray-800 px-3 py-1 rounded-full">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{' '}
						ONLINE
					</span>
					<Link href={'/login'}>
						<Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-bold transition-transform active:scale-95 hover:cursor-pointer">
							Login
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	)
}
