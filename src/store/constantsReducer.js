import constantsState from './globalConstants'
import { createSlice } from '@reduxjs/toolkit';

const constantsReducer = createSlice({
    name: 'app',
    initialState: constantsState,
    reducers: {
        platform(state, action) {
            if (action.payload >= state.sizeWindow.pc) {
                state.platform.isWindowPC = true;
                state.platform.isWindowTablet = false;
                state.platform.isWindowPhone = false;
            }

            else if (action.payload >= state.sizeWindow.tablet) {
                state.platform.isWindowPC = false;
                state.platform.isWindowTablet = true;
                state.platform.isWindowPhone = false;
            }

            else {
                state.platform.isWindowPC = false;
                state.platform.isWindowTablet = false;
                state.platform.isWindowPhone = true;
            }
        },
        blackTheme(state) {
            localStorage.setItem(state.localStorageKey.theme, state.localStorageValue.theme.Dark)
            state.isBlackTheme = true;
        },
        whiteTheme(state) {
            localStorage.setItem(state.localStorageKey.theme, state.localStorageValue.theme.White)
            state.isBlackTheme = false;
        },
    },
});

export const { platform, blackTheme, whiteTheme } = constantsReducer.actions;

export default constantsReducer.reducer;