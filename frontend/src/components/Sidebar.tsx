'use client'

import { Home, LibraryBig, Store, User, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
	{ icon: <Home />, label: 'Trang chủ', path: '/dashboard' },
	{ icon: <LibraryBig />, label: 'Thư viện', path: '/dashboard/library' },
	{ icon: <WalletCards />, label: 'Từ vựng', path: '/dashboard/vocabulary' },
	{ icon: <Store />, label: 'Cửa hàng', path: '/dashboard/shop' },
]

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 flex-col bg-[#0F172A] border-r border-white/5 z-60 shadow-2xl">
			{/* Logo Area */}
			<div className="p-6 pb-2">
				<div className="flex items-center gap-3 cursor-pointer">
					<Image
						src={'/app-icon.png'}
						alt="app-logo"
						width={40}
						height={40}
					/>
					<div>
						<h1 className="text-xl font-bold text-white font-serif tracking-tight">
							StoryLingua
						</h1>
						<p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
							Magic Reader
						</p>
					</div>
				</div>
			</div>

			{/* Navigation Items */}
			<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
				<div className="text-xs font-bold text-slate-500 uppercase px-4 mb-2 tracking-wider">
					Menu
				</div>
				{navItems.map((item) => {
					const isReallyActive =
						pathname === item.path ||
						(item.path !== '/dashboard' &&
							pathname?.includes(item.path))

					return (
						<Link
							key={item.path}
							href={item.path}
							className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
								isReallyActive
									? 'bg-purple-500/10 border border-purple-500/20 shadow-inner-glow'
									: 'hover:bg-white/5 border border-transparent'
							}`}
						>
							<span
								className={`material-symbols-outlined text-2xl transition-colors ${
									isReallyActive
										? 'text-purple-400 filled'
										: 'text-slate-400 group-hover:text-white'
								}`}
							>
								{item.icon}
							</span>
							<span
								className={`text-sm font-medium transition-colors ${
									isReallyActive
										? 'text-white font-bold'
										: 'text-slate-400 group-hover:text-white'
								}`}
							>
								{item.label}
							</span>
							{isReallyActive && (
								<div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
							)}
						</Link>
					)
				})}
			</nav>

			{/* Mascot Area */}
			<div className="p-4 mt-auto relative flex flex-col items-center justify-center">
				{/* FIXME: Change mascot and random quotes */}
				<div className="relative mb-4 group transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
					{/* Quote*/}
					<div className="relative z-10 px-3 py-3 max-w-[250px] bg-[#1e2036] border border-[#4f4d8c] rounded-2xl rounded-bl-none shadow-[0_4px_15px_rgba(99,102,241,0.2)]">
						<p className="text-sm font-medium text-gray-200 leading-relaxed text-center">
							&quot;zzz...z.z.z.z.z&quot;
						</p>
					</div>
					<div
						className="
                            absolute -bottom-2 left-6 w-4 h-4 bg-[#1e2036] border-b border-r border-[#4f4d8c] transform rotate-45"
					></div>
				</div>
				{/* Mascot */}
				<Image
					src="/mascot-dashboard-sleep.png"
					className=" object-cover"
					alt="Mascot"
					width={300}
					height={300}
				/>
				{/* User Profile */}
				<Link
					href={'/dashboard/profile'}
					className="bg-[#1E293B] rounded-2xl p-4 mt-4 border border-white/5 relative overflow-hidden group w-full"
				>
					<div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
					<div className="flex items-center gap-3 relative z-10">
						<div className="size-12 shrink-0 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
							{/* FIXME: Placeholder, replace with user data */}
							<Image
								src={'/app-icon.png'}
								alt="app-logo"
								width={40}
								height={40}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-bold text-purple-300 mb-0.5">
								Thân Quân
							</p>
						</div>
					</div>
				</Link>
			</div>
		</aside>
	)
}
