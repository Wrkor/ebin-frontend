import { createSlice } from '@reduxjs/toolkit';
import { postAuth } from '../API/user.service';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        isAuthLoading: true,
        isAuth: false,
        isEnterPhone: false,
        user: {},
    },
    reducers: {
        phone(state) {
            state.isEnterPhone = true;
        },
        login(state, action) {
            state.isAuth = true;
            state.isEnterPhone = true;
            state.user = action.payload.object;
        },
        logout(state) {
            state.isAuth = false;
            state.isEnterPhone = false;
            state.user = [];
        },
        authLoadingStop(state) {
            state.isAuthLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAuth.rejected, (_, action) => {
                throw new Error(action.payload);
            })
    },
});

export const {login, phone, logout, authLoadingStop} = userReducer.actions;

export default userReducer.reducer;