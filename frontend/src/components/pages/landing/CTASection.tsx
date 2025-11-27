import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import Link from 'next/link'

export default function CTASection() {
	return (
		<section className="max-w-5xl mx-auto px-6 pb-32">
			<FadeIn
				direction="up"
				className="group relative rounded-[3rem] py-12 p-6 md:p-24 text-center overflow-hidden border border-white/10 bg-[#0A1120] flex flex-col justify-center items-center"
			>
				{/* Animated Gradient Background */}
				<div className="absolute inset-0 bg-linear-to-r from-violet-900/40 to-indigo-900/40 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
				<div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />
				<div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px]" />

				<h2 className="text-4xl md:text-7xl font-bold mb-8 relative z-10 font-outfit">
					Ready to turn fluency into an adventure?
				</h2>
				<p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10">
					Master English naturally through storytelling. Join 1,200+
					users building their daily streak.
				</p>
				<div className="relative z-10">
					<Link href={'/login'}>
						<Button
							size="lg"
							className="h-16 px-12 rounded-full bg-white text-black font-bold text-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:cursor-pointer"
						>
							Create Free Account
						</Button>
					</Link>
					<p className="mt-6 text-sm text-gray-500">
						No credit card required • Cancel anytime
					</p>
				</div>
			</FadeIn>
		</section>
	)
}
