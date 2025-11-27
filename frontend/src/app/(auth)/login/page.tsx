'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import { ArrowLeft, Mail, Lock, Zap, Chrome, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		// Simulate API call
		setTimeout(() => setIsLoading(false), 2000)
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="min-h-screen w-full grid lg:grid-cols-2 bg-[#0F172A] text-white font-sans">
			{/* --- LEFT SIDE: FORM --- */}
			<div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10">
				<FadeIn delay={0.1}>
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors text-sm"
					>
						<ArrowLeft size={16} /> Back to Landing
					</Link>

					<div className="mb-8">
						<h1 className="text-3xl font-bold font-outfit mb-2">
							Welcome back, Weaver
						</h1>
						<p className="text-gray-400">
							Enter your credentials to access the Lexicon.
						</p>
					</div>

					<form onSubmit={handleLogin} className="space-y-5">
						{/* Email Input */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Email
							</label>
							<div className="relative group">
								<Mail
									className="absolute left-3 top-3 text-gray-500 group-focus-within:text-violet-400 transition-colors"
									size={18}
								/>
								<input
									type="email"
									placeholder="weaver@example.com"
									className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
									required
								/>
							</div>
						</div>

						{/* Password Input */}
						<div className="space-y-2">
							<div className="flex justify-between">
								<label className="text-sm font-medium text-gray-300 ml-1">
									Password
								</label>
								<Link
									href="#"
									className="text-xs text-violet-400 hover:text-violet-300"
								>
									Forgot password?
								</Link>
							</div>
							<div className="relative group">
								<Lock
									className="absolute left-3 top-3 text-gray-500 group-focus-within:text-violet-400 transition-colors"
									size={18}
								/>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
									required
								/>
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
							disabled={isLoading}
						>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{' '}
									Logging in...
								</span>
							) : (
								'Log In'
							)}
						</Button>
					</form>

					{/* Divider */}
					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-800"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-[#0F172A] px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					{/* Social Logins */}
					<div className="grid grid-cols-1 gap-4">
						<button className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">
							<Chrome size={18} /> Google
						</button>
					</div>

					<p className="mt-8 text-center text-sm text-gray-400">
						Don&apos;t have an account?{' '}
						<Link
							href="/register"
							className="text-amber-400 hover:text-amber-300 font-bold"
						>
							Sign Up
						</Link>
					</p>
				</FadeIn>
			</div>

			{/* --- RIGHT SIDE: ARTWORK (Hidden on mobile) --- */}
			<div className="hidden lg:flex flex-col justify-center items-center relative bg-[#050B14] overflow-hidden">
				<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
				{/* Background Gradient Animation */}
				<div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />

				<div className="relative z-10 p-12 text-center max-w-lg">
					<div className="w-24 h-24 bg-linear-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-500">
						<Zap size={40} className="text-white" />
					</div>
					<h2 className="text-4xl font-bold font-outfit mb-4">
						Level up your English
					</h2>
					<p className="text-gray-400 text-lg leading-relaxed">
						&quot;The limits of my language mean the limits of my
						world.&quot;
						<br />{' '}
						<span className="text-violet-400 text-sm mt-2 block">
							— Ludwig Wittgenstein
						</span>
					</p>

					{/* Decorative Cards */}
					<div className="mt-12 relative h-40 w-full flex justify-center">
						<div className="absolute w-32 h-40 bg-gray-800 rounded-xl border border-gray-700 rotate-[-10deg] left-20 top-2 z-0 opacity-60"></div>
						<div className="absolute w-32 h-40 bg-gray-800 rounded-xl border border-gray-700 rotate-10 right-20 top-2 z-0 opacity-60"></div>
						<div className="absolute w-36 h-48 bg-linear-to-b from-gray-800 to-gray-900 rounded-xl border border-violet-500/30 shadow-2xl z-10 flex flex-col items-center justify-center p-4">
							<div className="w-12 h-12 bg-amber-500/20 rounded-full mb-2 flex items-center justify-center">
								👑
							</div>
							<div className="h-2 w-16 bg-gray-700 rounded mb-1"></div>
							<div className="h-2 w-10 bg-gray-700 rounded"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
