import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '../../../hooks'

const Toasts = () => {
	const { isBlackTheme } = useTheme()

	return (
		<ToastContainer
			position='bottom-left'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme={isBlackTheme ? 'dark' : 'light'}
			transition={Bounce}
		/>
	)
}

export default Toasts
