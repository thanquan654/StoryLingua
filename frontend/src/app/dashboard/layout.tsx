import BottomNavigation from '@/components/BottomNavigation'
import React, { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<div>{children}</div>
			<BottomNavigation />
		</div>
	)
}
