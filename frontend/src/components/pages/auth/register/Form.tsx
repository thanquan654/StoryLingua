'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useActionState, useState } from 'react'
import GoogleIcon from '@/components/ui/google-icon'
import { registerAction } from '@/app/actions/authActions'

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const [state, formAction, isPending] = useActionState(registerAction, {
		message: '',
	})

	return (
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

				<form action={formAction} className="space-y-5">
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
								tabIndex={1}
								min={4}
								max={32}
								defaultValue={state?.payload?.displayName || ''}
								className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
								required
								autoComplete="off"
							/>
						</div>
						{state?.errors?.displayName && (
							<p className="text-sm text-red-500 mt-1">
								{state.errors.displayName[0]}
							</p>
						)}
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
								defaultValue={state?.payload?.email || ''}
								tabIndex={2}
								placeholder="name@example.com"
								className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
								required
								autoComplete="email"
							/>
						</div>
						{state?.errors?.email && (
							<p className="text-sm text-red-500 mt-1">
								{state.errors.email[0]}
							</p>
						)}
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
								defaultValue={state?.payload?.password || ''}
								min={6}
								max={32}
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								className="w-full bg-[#1E293B] border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
								required
								tabIndex={3}
								autoComplete="new-password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
							>
								{showPassword ? (
									<EyeOff size={18} />
								) : (
									<Eye size={18} />
								)}
							</button>
						</div>
						{state?.errors?.password && (
							<p className="text-sm text-red-500 mt-1">
								{state.errors.password[0]}
							</p>
						)}
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
								type={showConfirmPassword ? 'text' : 'password'}
								min={6}
								max={32}
								defaultValue={
									state?.payload?.confirmPassword || ''
								}
								placeholder="••••••••"
								className={`w-full bg-[#1E293B] border rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all shadow-sm border-gray-700 focus:border-amber-500 focus:ring-amber-500`}
								required
								tabIndex={4}
								autoComplete="new-password"
							/>
							<button
								type="button"
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
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
						{state?.errors?.confirmPassword && (
							<p className="text-sm text-red-500 mt-1">
								{state.errors.confirmPassword[0]}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full h-12 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black rounded-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:cursor-pointer hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isPending}
						tabIndex={5}
					>
						{isPending ? (
							<span className="flex items-center gap-2">
								<span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
								Creating Account...
							</span>
						) : (
							'Sign Up'
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
						tabIndex={5}
					>
						<GoogleIcon />
						Continue with Google
					</button>
				</div>

				<p className="mt-8 text-center text-sm text-gray-400">
					Already have an account?{' '}
					<Link
						href="/login"
						tabIndex={6}
						className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
					>
						Log In
					</Link>
				</p>
			</div>
		</div>
	)
}
