import { useSelector } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import globalConstants from '../config/globalConstants'
import useActions from './useActions'

export const useTheme = () => {
	const isBlackTheme = useSelector(state => state.storage.isBlackTheme)
	const colors = useSelector(state => state.storage.colors)
	const { setWhiteTheme, setBlackTheme } = useActions()
	const [theme, SetTheme] = useLocalStorage(
		globalConstants.localStorage.theme.key,
		globalConstants.localStorage.theme.white
	)
	const setWhite = () => {
		SetTheme(globalConstants.localStorage.theme.white)
		setWhiteTheme()
	}
	const setBlack = () => {
		SetTheme(globalConstants.localStorage.theme.dark)
		setBlackTheme()
	}

	const toggleTheme = () => {
		if (theme === globalConstants.localStorage.theme.dark) setWhite()
		else setBlack()
	}

	const setTheme = () => {
		if (theme === globalConstants.localStorage.theme.dark) setBlack()
		else setWhite()
	}

	return { isBlackTheme, theme, colors, setBlack, setWhite, toggleTheme, setTheme }
}
