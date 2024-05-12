import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useWindowSize } from 'usehooks-ts'
import Header from './components/header/Header'
import Toasts from './components/modals/toasts/Toasts'
import { useTheme } from './hooks'
import useActions from './hooks/useActions'
import AppRouter from './router/AppRouter'
import AppStyler from './styler/AppStyler'
import './styles/App.scss'

const App = () => {
	const { postAuth, setPlatforms } = useActions()
	const { setTheme } = useTheme()
	const { width } = useWindowSize()

	useEffect(() => {
		setPlatforms(width)
	}, [width, setPlatforms])

	useEffect(() => {
		postAuth()
		setTheme()
		// eslint-disable-next-line
	}, [postAuth])

	return (
		<BrowserRouter>
			<Header />
			<AppRouter />
			<AppStyler />
			<Toasts />
		</BrowserRouter>
	)
}

export default App
