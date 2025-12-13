'use client'

import { Home, LibraryBig, Store, User, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
	{ icon: <Home />, label: 'Trang chủ', path: '/dashboard' },
	{ icon: <LibraryBig />, label: 'Thư viện', path: '/dashboard/library' },
	{ icon: <WalletCards />, label: 'Từ vựng', path: '/dashboard/vocabulary' },
	{ icon: <User />, label: 'Hồ sơ', path: '/dashboard/profile' },
	{ icon: <Store />, label: 'Cửa hàng', path: '/dashboard/shop' },
]

export default function BottomNavigation() {
	const pathname = usePathname()

	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/5 pb-4 pt-2 z-50">
			<ul className="grid grid-cols-5 items-center w-full px-2 max-w-md mx-auto">
				{navItems.map((item) => {
					const isReallyActive =
						pathname === item.path ||
						(item.path !== '/dashboard' &&
							pathname?.includes(item.path))

					return (
						<li key={item.path}>
							<Link
								href={item.path}
								className="flex flex-col items-center gap-1 group py-1 cursor-pointer"
							>
								<div
									className={`p-1.5 rounded-xl transition-colors ${
										isReallyActive
											? 'bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
											: 'group-hover:bg-white/5'
									}`}
								>
									<span
										className={`material-symbols-outlined text-2xl transition-colors ${
											isReallyActive
												? 'text-purple-400 filled drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
												: 'text-slate-500 group-hover:text-purple-400'
										}`}
									>
										{item.icon}
									</span>
								</div>
								<span
									className={`text-[10px] font-medium transition-colors ${
										isReallyActive
											? 'text-purple-400 font-bold'
											: 'text-slate-500 group-hover:text-purple-400'
									}`}
								>
									{item.label}
								</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
