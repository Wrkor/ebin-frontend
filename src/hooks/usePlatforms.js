import { useSelector } from 'react-redux'

export const usePlatforms = () => {
	const platforms = useSelector(state => state.storage.platforms)

	return platforms
}
