import { createSlice } from '@reduxjs/toolkit';
import { postAuth } from '../API/user.service';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        isAuthLoading: true,
        isAuth: false,
        isPhone: false,
        user: [],
    },
    reducers: {
        phone(state) {
            state.isPhone = true;
        },
        login(state, action) {
            state.isAuth = true;
            state.isPhone = true;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isAuth = false;
            state.isPhone = false;
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