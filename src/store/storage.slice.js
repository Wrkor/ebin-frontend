import { createSlice } from '@reduxjs/toolkit';
import storageState from './storage.state'
import * as storageActions from './storage.actions';

const storageSlice = createSlice({
    name: 'app',
    initialState: storageState,
    reducers: {...storageActions},
});

export const { setPlatforms, setBlackTheme, setWhiteTheme } = storageSlice.actions;

export default storageSlice;
