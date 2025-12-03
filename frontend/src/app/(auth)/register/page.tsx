'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	ArrowLeft,
	Mail,
	Lock,
	User,
	Eye,
	EyeOff,
	Check,
	X,
	AlertCircle,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import GoogleIcon from '@/components/ui/google-icon' // Giả sử bạn đã tách component này
import { authService } from '@/services/auth.service'
import { RegisterRequest } from '@/types/auth'

export default function RegisterPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [error, setError] = useState<string | null>('')

	// Form States
	const [registerformValue, setRegisterFormValue] = useState<RegisterRequest>(
		{
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	)

	// Handle Input Change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setRegisterFormValue((prev) => ({ ...prev, [name]: value }))
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const data = await authService.register(registerformValue)

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
			{/* --- LEFT SIDE: VALUE PROPOSITION --- */}
			<div className="hidden lg:flex flex-col justify-center items-center relative bg-[#050B14] overflow-hidden border-r border-white/5">
				<div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10 mix-blend-overlay" />

				{/* Background Blobs */}
				<div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-3xl animate-pulse duration-[4s]" />
				<div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl" />

				<div className="relative z-10 text-left max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000">
					<h2 className="text-5xl font-bold font-outfit mb-8 text-transparent bg-clip-text bg-linear-to-br from-white to-gray-400 leading-tight">
						Forget Memorizing. Start Living the Language.
					</h2>

					{/* Benefit List  */}
					<div className="space-y-4 text-left">
						{[
							'Unlimited AI Story Generation',
							'Personalized Vocabulary Deck',
							'Smart Memory Tracking',
							'Addictive Gamification',
						].map((item, idx) => (
							<div
								key={idx}
								className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group"
							>
								<div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
									<Check size={16} strokeWidth={3} />
								</div>
								<span className="text-gray-300 font-medium">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* --- RIGHT SIDE: FORM --- */}
			<div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 relative z-10 py-10 overflow-y-auto h-full">
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
					<div className="mb-8">
						<h1 className="text-3xl font-bold font-outfit mb-2 text-white">
							Create Free Account
						</h1>
						<p className="text-gray-400">
							Begin your journey to fluency today.
						</p>
					</div>

					<form onSubmit={handleRegister} className="space-y-5">
						{/* Username Input */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Display Name
							</label>
							<div className="relative group">
								<User
									className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-amber-400 transition-colors pointer-events-none"
									size={18}
								/>
								<input
									name="displayName"
									type="text"
									placeholder="john_doe"
									value={registerformValue.displayName}
									onChange={handleChange}
									className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
									required
									autoComplete="off"
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
									className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-amber-400 transition-colors pointer-events-none"
									size={18}
								/>
								<input
									name="email"
									type="email"
									placeholder="name@example.com"
									value={registerformValue.email}
									onChange={handleChange}
									className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
									required
									autoComplete="email"
								/>
							</div>
						</div>

						{/* Password Input & Strength Meter */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Password
							</label>
							<div className="relative group">
								<Lock
									className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-amber-400 transition-colors pointer-events-none"
									size={18}
								/>
								<input
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									value={registerformValue.password}
									onChange={handleChange}
									className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
									required
									autoComplete="new-password"
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						{/* Confirm Password Input */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Confirm Password
							</label>
							<div className="relative group">
								<Lock
									className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-amber-400 transition-colors pointer-events-none"
									size={18}
								/>
								<input
									name="confirmPassword"
									type={
										showConfirmPassword
											? 'text'
											: 'password'
									}
									placeholder="••••••••"
									value={registerformValue.confirmPassword}
									onChange={handleChange}
									className={`w-full bg-[#1E293B] border rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all shadow-sm border-gray-700 focus:border-amber-500 focus:ring-amber-500`}
									required
									autoComplete="new-password"
								/>
								<button
									type="button"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword,
										)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
								>
									{showConfirmPassword ? (
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
							className="w-full h-12 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black rounded-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:cursor-pointer hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={isLoading}
						>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
									Creating Account...
								</span>
							) : (
								'Sign Up'
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

					{/* Divider & Social */}
					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-800"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase tracking-widest">
							<span className="bg-[#0F172A] px-4 text-gray-500 font-medium">
								Or
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1">
						<button
							type="button"
							className="flex items-center justify-center gap-3 h-12 bg-white text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all font-bold text-sm"
						>
							<GoogleIcon />
							Continue with Google
						</button>
					</div>

					<p className="mt-8 text-center text-sm text-gray-400">
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
						>
							Log In
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
