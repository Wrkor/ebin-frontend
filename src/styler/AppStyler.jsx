import React, { useEffect } from 'react'
import { useTheme } from '../hooks'

const AppStyler = () => {
	const { isBlackTheme, colors } = useTheme()

	useEffect(() => {
		const root = document.getElementById('root')
		const body = root.parentElement

		if (isBlackTheme) {
			body.style.setProperty('--bs-body-bg', colors.blackTheme.bgPage)

			root.style.setProperty('--app-black', colors.blackTheme.black)
			root.style.setProperty('--swiper-theme-color', colors.blackTheme.black)
			root.style.setProperty('--app-black-90', colors.blackTheme.black90)
			root.style.setProperty('--app-black-80', colors.blackTheme.black80)
			root.style.setProperty('--app-black-70', colors.blackTheme.black70)
			root.style.setProperty('--app-black-60', colors.blackTheme.black60)
			root.style.setProperty('--bs-modal-color', colors.blackTheme.bgModals)
			root.style.setProperty('--app-modal-bg', colors.blackTheme.bgModals)
			root.style.setProperty('--app-input-color', colors.blackTheme.bgInput)
			root.style.setProperty('--app-border-block', colors.blackTheme.borderBlock)
			root.style.setProperty('--app-border-table', colors.blackTheme.borderTable)
			root.style.setProperty('--bs-border-color', colors.blackTheme.borderTable)
			root.style.setProperty('--app-filter', colors.blackTheme.filter)
			root.style.setProperty('--app-error-color', colors.blackTheme.errorColor)
		} else {
			body.style.setProperty('--bs-body-bg', colors.whiteTheme.bgPage)

			root.style.setProperty('--app-black', colors.whiteTheme.black)
			root.style.setProperty('--swiper-theme-color', colors.whiteTheme.black)
			root.style.setProperty('--app-black-90', colors.whiteTheme.black90)
			root.style.setProperty('--app-black-80', colors.whiteTheme.black80)
			root.style.setProperty('--app-black-70', colors.whiteTheme.black70)
			root.style.setProperty('--app-black-60', colors.whiteTheme.black60)
			root.style.setProperty('--bs-modal-color', colors.whiteTheme.bgModals)
			root.style.setProperty('--app-modal-bg', colors.whiteTheme.bgModals)
			root.style.setProperty('--app-input-color', colors.whiteTheme.bgInput)
			root.style.setProperty('--app-border-block', colors.whiteTheme.borderBlock)
			root.style.setProperty('--app-border-table', colors.whiteTheme.borderTable)
			root.style.setProperty('--bs-border-color', colors.whiteTheme.borderTable)
			root.style.setProperty('--app-filter', colors.whiteTheme.filter)
			root.style.setProperty('--app-error-color', colors.whiteTheme.errorColor)
		}
	}, [isBlackTheme, colors])
	return <></>
}

export default AppStyler
