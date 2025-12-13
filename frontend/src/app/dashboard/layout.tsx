import BottomNavigation from '@/components/BottomNavigation'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'
import { userService } from '@/services/user.service'
import { cookies } from 'next/headers'

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode
}) {
	const accessToken = (await cookies()).get('accessToken')?.value

	const userProfile = await (await userService.getMyProfile(accessToken)).data
	return (
		<div className="flex min-h-screen bg-[#0F172A]">
			<div className="flex-1 w-full md:pl-56 transition-[padding] duration-300 relative isolate">
				{children}
			</div>
			<BottomNavigation />
			<Sidebar user={userProfile} />
		</div>
	)
}
