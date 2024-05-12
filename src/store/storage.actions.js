export const setPlatforms = (state, action) => {
	if (action.payload >= state.sizeWindow.pc) {
		state.platforms.isWindowPC = true
		state.platforms.isWindowTablet = false
		state.platforms.isWindowPhone = false
	} else if (action.payload >= state.sizeWindow.tablet) {
		state.platforms.isWindowPC = false
		state.platforms.isWindowTablet = true
		state.platforms.isWindowPhone = false
	} else {
		state.platforms.isWindowPC = false
		state.platforms.isWindowTablet = false
		state.platforms.isWindowPhone = true
	}
}

export const setBlackTheme = state => {
	state.isBlackTheme = true
}

export const setWhiteTheme = state => {
	state.isBlackTheme = false
}
