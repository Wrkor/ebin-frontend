import { createSlice } from '@reduxjs/toolkit';
import {getApp, getApps} from '../API/app.service'

const appReducer = createSlice({
    name: 'app',
    initialState: {
        apps: [],
        app: {},
        updates: [],
    },
    reducers: {
        setApps(state, action) {
            state.apps = action.payload.apps;
        },
        setApp(state, action) {
            state.app = action.payload.app;
            state.updates = action.payload.updates;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApp.rejected, (_, action) => {
                throw new Error(action.payload);
            })
            .addCase(getApps.rejected, (_, action) => {
                throw new Error(action.payload);
            })
    },
});

export const {setApps, setApp} = appReducer.actions;

export default appReducer.reducer;