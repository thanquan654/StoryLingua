'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import GoogleIcon from '@/components/ui/google-icon'
import { useActionState } from 'react'
import { loginAction } from '@/app/actions/authActions'

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)

	const [state, formAction, isPending] = useActionState(loginAction, {
		message: '',
	})
	return (
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

				<form action={formAction} className="space-y-5">
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
								defaultValue={state?.payload?.email || ''}
								autoComplete="username"
								placeholder="name@example.com"
								className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-sm"
								required
							/>
						</div>
						{state?.errors?.email && (
							<p
								id="email-error"
								className="text-sm text-red-500 mt-1"
							>
								{state.errors.email[0]}
							</p>
						)}
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
								defaultValue={state?.payload?.password || ''}
								type={showPassword ? 'text' : 'password'}
								autoComplete="current-password"
								min={6}
								max={32}
								placeholder="••••••••"
								className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-sm"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
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
						{state?.errors?.password && (
							<p
								id="password-error"
								className="text-sm text-red-500 mt-1"
							>
								{state.errors.password[0]}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer"
						disabled={isPending}
					>
						{isPending ? (
							<span className="flex items-center gap-2">
								<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Logging in...
							</span>
						) : (
							'Log In'
						)}
					</Button>

					{/* ERROR MESSAGE ALERT */}
					{state?.message && (
						<div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
							<AlertCircle size={16} />
							{state.message}
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
	)
}
