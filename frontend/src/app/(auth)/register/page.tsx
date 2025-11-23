'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import { ArrowLeft, Mail, Lock, User, Zap } from 'lucide-react'
import { useState } from 'react'

export default function RegisterPage() {
	const [isLoading, setIsLoading] = useState(false)

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		// Simulate API call
		setTimeout(() => setIsLoading(false), 2000)
	}

	return (
		<div className="min-h-screen w-full grid lg:grid-cols-2 bg-[#0F172A] text-white font-sans">
			{/* --- LEFT SIDE: ARTWORK (Swapped side for variety) --- */}
			<div className="hidden lg:flex flex-col justify-center items-center relative bg-[#050B14] overflow-hidden">
				<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
				<div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px]" />

				<div className="relative z-10 text-center max-w-md">
					<h2 className="text-5xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
						Join the Alliance.
					</h2>
					<div className="space-y-4 text-left bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
						<div className="flex items-center gap-3">
							<div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs">
								✓
							</div>
							<span className="text-gray-300">
								Free AI Story Generation
							</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs">
								✓
							</div>
							<span className="text-gray-300">
								Spaced Repetition System (FSRS)
							</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs">
								✓
							</div>
							<span className="text-gray-300">
								Daily Quests & Rewards
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* --- RIGHT SIDE: FORM --- */}
			<div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10">
				<FadeIn delay={0.1}>
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors text-sm"
					>
						<ArrowLeft size={16} /> Back to Home
					</Link>

					<div className="mb-8">
						<h1 className="text-3xl font-bold font-outfit mb-2">
							Create Account
						</h1>
						<p className="text-gray-400">
							Start your journey to revive Planet Lexicon today.
						</p>
					</div>

					<form onSubmit={handleRegister} className="space-y-5">
						{/* Username Input */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Username
							</label>
							<div className="relative group">
								<User
									className="absolute left-3 top-3 text-gray-500 group-focus-within:text-amber-400 transition-colors"
									size={18}
								/>
								<input
									type="text"
									placeholder="CaptainWeaver"
									className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
									required
								/>
							</div>
						</div>

						{/* Email Input */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Email
							</label>
							<div className="relative group">
								<Mail
									className="absolute left-3 top-3 text-gray-500 group-focus-within:text-amber-400 transition-colors"
									size={18}
								/>
								<input
									type="email"
									placeholder="weaver@example.com"
									className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
									required
								/>
							</div>
						</div>

						{/* Password Input */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Password
							</label>
							<div className="relative group">
								<Lock
									className="absolute left-3 top-3 text-gray-500 group-focus-within:text-amber-400 transition-colors"
									size={18}
								/>
								<input
									type="password"
									placeholder="Create a strong password"
									className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
									required
								/>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black rounded-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
							disabled={isLoading}
						>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />{' '}
									Creating Account...
								</span>
							) : (
								'Sign Up Free'
							)}
						</Button>
					</form>

					<p className="mt-8 text-center text-sm text-gray-400">
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-violet-400 hover:text-violet-300 font-bold"
						>
							Log In
						</Link>
					</p>
				</FadeIn>
			</div>
		</div>
	)
}
