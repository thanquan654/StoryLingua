import { logoutAction } from '@/app/actions/authActions'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
	return (
		<form action={logoutAction}>
			<Button
				type="submit"
				variant={'ghost'}
				className="px-4 py-2 text-sm font-medium cursor-pointer"
			>
				Đăng xuất
			</Button>
		</form>
	)
}
