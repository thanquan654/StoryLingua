'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import GoogleIcon from '@/components/ui/google-icon'
import { authService } from '@/services/auth.service'
import { LoginRequest } from '@/types/auth'

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>('')

	const [loginFormValue, setLoginFormValue] = useState<LoginRequest>({
		email: '',
		password: '',
	})

	const handleLoginFormValueChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, value } = e.target
		setLoginFormValue((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const data = await authService.login(loginFormValue)

			console.log('🚀 ~ data:', data)
		} catch (err) {
			if (err instanceof Error) setError(err.message)
			else setError('Unknown Error')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen w-full grid lg:grid-cols-2 bg-[#0F172A] text-white font-sans overflow-hidden">
			{/* --- LEFT SIDE: FORM --- */}
			<div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 relative z-10 h-full overflow-y-auto py-10">
				<FadeIn delay={0.1}>
					<div className="mb-8">
						<h1 className="text-3xl font-bold font-outfit mb-2 text-white">
							Welcome back!
						</h1>
						<p className="text-gray-400">
							Ready to master some new words today?
						</p>
					</div>

					<form onSubmit={handleLogin} className="space-y-5">
						{/* Email Input */}
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-300 ml-1"
							>
								Email
							</label>
							<div className="relative group">
								<Mail
									className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors pointer-events-none"
									size={18}
								/>
								<input
									id="email"
									name="email"
									type="email"
									value={loginFormValue.email}
									onChange={handleLoginFormValueChange}
									autoComplete="username"
									placeholder="name@example.com"
									className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-sm"
									required
								/>
							</div>
						</div>

						{/* Password Input */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<label
									htmlFor="password"
									className="text-sm font-medium text-gray-300 ml-1"
								>
									Password
								</label>
								<Link
									href="/forgot-password"
									className="text-xs text-violet-400 hover:text-violet-300 hover:underline hover:cursor-pointer"
								>
									Forgot password?
								</Link>
							</div>
							<div className="relative group">
								<Lock
									className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors pointer-events-none"
									size={18}
								/>
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									value={loginFormValue.password}
									onChange={handleLoginFormValueChange}
									autoComplete="current-password"
									placeholder="••••••••"
									className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-sm"
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
									aria-label={
										showPassword
											? 'Hide password'
											: 'Show password'
									}
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
							type="submit"
							className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer"
							disabled={isLoading}
						>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Logging in...
								</span>
							) : (
								'Log In'
							)}
						</Button>

						{/* ERROR MESSAGE ALERT */}
						{error && (
							<div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
								<AlertCircle size={16} />
								{error}
							</div>
						)}
					</form>

					{/* Divider */}
					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-800"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase tracking-widest">
							<span className="bg-[#0F172A] px-4 text-gray-500 font-medium">
								Or continue with
							</span>
						</div>
					</div>

					{/* Social Logins */}
					<div className="grid grid-cols-1 gap-4">
						<button
							type="button"
							className="flex items-center justify-center gap-3 h-12 bg-white text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all font-bold text-sm hover:-translate-y-0.5 duration-200 hover:cursor-pointer"
						>
							<GoogleIcon />
							Sign in with Google
						</button>
					</div>

					<p className="mt-8 text-center text-sm text-gray-400">
						New to StoryLingua?{' '}
						<Link
							href="/register"
							className="text-violet-400 hover:text-violet-300 font-bold hover:underline transition-all"
						>
							Create an account
						</Link>
					</p>
				</FadeIn>
			</div>

			{/* --- RIGHT SIDE: ARTWORK --- */}
			<div className="hidden lg:flex flex-col justify-center items-center relative bg-[#050B14] overflow-hidden border-l border-white/5">
				<div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10 mix-blend-overlay" />

				{/* Background Blobs */}
				<div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-3xl animate-pulse duration-1000" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />

				<div className="relative z-10 p-12 text-center max-w-lg">
					<div className="w-24 h-24 bg-linear-to-br from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/30  hover:rotate-3 hover:scale-105 transition-all duration-500 cursor-pointer">
						<Image
							src={'/app-icon.png'}
							alt="icon"
							width={160}
							height={160}
						/>
					</div>

					<h2 className="text-4xl font-bold font-outfit mb-6 text-white leading-tight">
						Level up your <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
							English Mastery
						</span>
					</h2>

					<p className="text-gray-400 text-lg leading-relaxed font-serif italic">
						&quot;The limits of my language mean the limits of my
						world.&quot;
					</p>
					<div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-gray-500">
						<span className="w-8 h-px bg-gray-700" />
						<i>Ludwig Wittgenstein</i>
						<span className="w-8 h-px bg-gray-700" />
					</div>
				</div>
			</div>
		</div>
	)
}
