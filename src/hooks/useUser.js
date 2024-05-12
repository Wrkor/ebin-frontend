import { useSelector } from 'react-redux'

export const useUser = () => {
	const user = useSelector(state => state.user.user)
	const isAuth = useSelector(state => state.user.isAuth)
	const isAuthLoading = useSelector(state => state.user.isAuthLoading)

	return { user, isAuth, isAuthLoading }
}
