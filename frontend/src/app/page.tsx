import BentoGrid from '@/components/pages/landing/BentoGrid'
import CosmicBackground from '@/components/pages/landing/CosmicBackground'
import CTASection from '@/components/pages/landing/CTASection'
import FAQSection from '@/components/pages/landing/FAQSection'
import Footer from '@/components/pages/landing/Footer'
import Hero from '@/components/pages/landing/Hero'
import LibraryPreview from '@/components/pages/landing/LibraryPreview'
import MethodologySection from '@/components/pages/landing/MethodologySection'
import Navbar from '@/components/pages/landing/Navbar'

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
