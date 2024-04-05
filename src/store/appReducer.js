import { createSlice } from '@reduxjs/toolkit';
import {getApp, getApps} from '../API/app.service'
import { DateSort } from '../utils';
import globalConstants from './globalConstants'

const NormalizeDateSort = (arr) => arr?.length > 0 ? DateSort([...arr]) : [];
const NormalizeImg = (imgs) => imgs?.length > 0 ? imgs.split('\n').map(img => globalConstants.api + '/' + img) : [];

const appReducer = createSlice({
    name: 'app',
    initialState: {
        apps: [],
        appCashed: {
            updates: [],
        },
        appCreate: {},
        updateCreate: {},
        appEdit: {},
    },
    reducers: {
        setApps(state, action) {
            state.apps = action.payload.objects.map(object => {
                const updates = NormalizeDateSort(object.updates);
                const reviews = NormalizeDateSort(object.reviews);

                return {
                    ...object,
                    reviews: reviews,
                    updates: updates,
                    lastUpdate: updates[0] || [], 
                    release: updates[updates.length - 1] || [],
                    icon: globalConstants.api + '/' + object.icon,
                }
            })
        },
        setAppCashed(state, action) {
            const updates = NormalizeDateSort(action.payload.object.updates);
            const reviews = NormalizeDateSort(action.payload.object.reviews);
            const images = NormalizeImg(action.payload.object.images);

            state.appCashed = {
                ...action.payload.object,
                reviews: reviews,
                updates: updates,
                lastUpdate: updates[0] || [], 
                release: updates[updates.length - 1] || [],
                images: images,
                icon: globalConstants.api + '/' + action.payload.object.icon,
            };
        },
        setAppCreate(state, action) {
            state.appCreate = action.payload;
        },
        setUpdateCreate(state, action) {
            const updates = NormalizeDateSort(action.payload.object.updates);
            const reviews = NormalizeDateSort(action.payload.object.reviews);
            const images = NormalizeImg(action.payload.object.images);

            state.updateCreate.app = {
                ...action.payload.object,
                reviews: reviews,
                updates: updates,
                lastUpdate: updates[0] || [], 
                release: updates[updates.length - 1] || [],
                images: images,
                icon: globalConstants.api + '/' + action.payload.object.icon,
            };
        },
        changeUpdateCreate(state, action) {
            state.updateCreate = action.payload;
        },
        setAppEdit(state, action) {
            const updates = NormalizeDateSort(action.payload.object.updates);
            const reviews = NormalizeDateSort(action.payload.object.reviews);
            const images = NormalizeImg(action.payload.object.images);

            const app = {
                ...action.payload.object,
                reviews: reviews,
                updates: updates,
                lastUpdate: updates[0] || [], 
                release: updates[updates.length - 1] || [],
                images: images,
                icon: globalConstants.api + '/' + action.payload.object.icon,
            };

            state.appEdit = {
                ...app, 
                app: app,
                isAndroid: app?.lastUpdate?.filePath?.length > 0 ? true : false,
                isIos: app?.lastUpdate?.testFlight?.length > 0 ? true : false,
            }
        },
        changeAppEdit(state, action) {
            state.appEdit = action.payload;
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

export const {setApps, setAppCashed, setAppCreate, setUpdateCreate, changeUpdateCreate, setAppEdit, changeAppEdit} = appReducer.actions;

export default appReducer.reducer;