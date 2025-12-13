import FeatureUnderConstruction from '@/components/FeatureUnderConstruction'
import { LogoutButton } from '@/components/ui/logout-button'

export default function HomePage() {
	return (
		<div>
			Dashboard
			<FeatureUnderConstruction />
			<LogoutButton />
		</div>
	)
}
