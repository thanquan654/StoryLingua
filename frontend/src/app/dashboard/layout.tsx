import BottomNavigation from '@/components/BottomNavigation'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen bg-[#0F172A]">
			<div className="flex-1 w-full md:pl-56 transition-[padding] duration-300 relative isolate">
				{children}
			</div>
			<BottomNavigation />
			<Sidebar />
		</div>
	)
}
