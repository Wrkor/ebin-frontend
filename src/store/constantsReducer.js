import constantsState from './globalConstants'
import { createSlice } from '@reduxjs/toolkit';

const constantsReducer = createSlice({
    name: 'app',
    initialState: constantsState,
    reducers: {

    },
});


export default constantsReducer.reducer;