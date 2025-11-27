import dynamic from 'next/dynamic'
import Navbar from '@/components/pages/landing/Navbar'
import Hero from '@/components/pages/landing/Hero'

const BentoGrid = dynamic(
	() => import('@/components/pages/landing/BentoGrid'),
	{
		loading: () => <div className="h-96" />,
	},
)
const CosmicBackground = dynamic(
	() => import('@/components/pages/landing/CosmicBackground'),
)
const CTASection = dynamic(
	() => import('@/components/pages/landing/CTASection'),
	{
		loading: () => <div className="h-96" />,
	},
)
const FAQSection = dynamic(
	() => import('@/components/pages/landing/FAQSection'),
	{
		loading: () => <div className="h-96" />,
	},
)
const Footer = dynamic(() => import('@/components/pages/landing/Footer'), {
	loading: () => <div className="h-24" />,
})
const LibraryPreview = dynamic(
	() => import('@/components/pages/landing/LibraryPreview'),
	{
		loading: () => <div className="h-96" />,
	},
)
const MethodologySection = dynamic(
	() => import('@/components/pages/landing/MethodologySection'),
	{
		loading: () => <div className="h-96" />,
	},
)

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-[#050B14] text-white overflow-x-hidden font-sans selection:bg-indigo-500/30">
			<CosmicBackground />
			<Navbar />
			<main className="relative z-10">
				<Hero />
				<MethodologySection />
				<BentoGrid />
				<LibraryPreview />
				<FAQSection />
				<CTASection />
				<Footer />
			</main>
		</div>
	)
}
