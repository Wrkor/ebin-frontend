import { AxiosGet, AxiosPost } from "./";
import { createAsyncThunk } from '@reduxjs/toolkit'
import {setApps, setApp} from '../store/appReducer'
import constantsState from "../store/globalConstants";

// Когда появится сервер подправить скрипт
/* eslint-disable */

const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');

const app = {
    id: 1567, 
    name: 'En+ Binding',
    status: 'Рабочая версия',
    developer: 'En+ Digital',
    discription: "Aenean enim est, hendrerit vel sodales id, porttitor tincidunt urna. Integer metus ipsum, egestas at velit ac, tempor efficitur massa. Praesent finibus convallis placerat. Quisque convallis consequat diam ut faucibus. Phasellus tincidunt, massa dictum cursus accumsan, ex tellus viverra orci, non faucibus mauris neque id turpis. Curabitur rutrum est sed velit molestie, id malesuada lorem facilisis. Curabitur sed nunc ac nisl eleifend sagittis. Cras lobortis massa sed justo finibus porttitor. Fusce blandit velit in malesuada hendrerit. Quisque leo libero, consectetur ac imperdiet id, rutrum porta enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    min_android: '5.0',
    min_ios: '14.0',
    icon: getBase64StringFromDataURL('../assets/Rectangle 1.png'),
    images: [
        getBase64StringFromDataURL('../assets/Rectangle 2.png'),
        getBase64StringFromDataURL('../assets/Rectangle 3.png'),
        getBase64StringFromDataURL('../assets/Rectangle 4.png'),
        getBase64StringFromDataURL('../assets/Rectangle 5.png')
    ],
};

const apps = [];
apps.push({...app, images: null, discription: null, min_android: null, min_ios: null});
apps.push({...app, images: null, discription: null, min_android: null, min_ios: null});
apps.push({...app, images: null, discription: null, min_android: null, min_ios: null});
apps.push({...app, images: null, discription: null, min_android: null, min_ios: null});

const ms = 500;

const update = {
    id: 1125,
    version: '3.0.2',
    date: Date.now(),
    description: 'Fusce nisl odio, venenatis et sodales eu, luctus in nibh. \nNulla facilisi. \nNunc sit amet tortor eu nisi malesuada volutpat. \nNulla diam justo, facilisis vitae placerat ut, consequat vitae nunc.',
}

const updates = [];
updates.push(update);
updates.push(update);
updates.push(update);
updates.push(update);
updates.push(update);

export const getApp = createAsyncThunk(
    'user/getApp',
    async function(id, {rejectWithValue, dispatch}) {
        setTimeout(() => {
            dispatch(setApp({app}));
        }, ms);
        return;

        AxiosGet(constantsState.endPoints.app, id)
        .then((response) => {
            if (response.status === 200) {
                dispatch(setApp(JSON.parse(response.data)));
            }
        })
    }
)

export const getApps = createAsyncThunk(
    'user/getApps',
    async function(_, {rejectWithValue, dispatch}) {
        setTimeout(() => {
            dispatch(setApps({apps}));
        }, ms);
        return;

        AxiosGet(constantsState.endPoints.apps)
        .then((response) => {
            if (response.status === 200) {
                dispatch(setApps(JSON.parse(response.data)));
            }
        })
    }
)

export async function postAppUpdate(data) {
    return true;
    return await AxiosPost(constantsState.endPoints.update, data)
        .then((response) => {
            if (response.status === 200) {
                return JSON.parse(response.data)
            }
        })
}

export async function postAppCreate(data) {
    return true;
    return await AxiosPost(constantsState.endPoints.create, data)
        .then((response) => {
            if (response.status === 200) {
                return JSON.parse(response.data)
            }
        })
}

export async function postAppEdit(data) {
    return true;
    return await AxiosPost(constantsState.endPoints.edit, data)
        .then((response) => {
            if (response.status === 200) {
                return JSON.parse(response.data)
            }
        })
}

export async function postAppDelete(id) {
    return true;
    return await AxiosPost(constantsState.endPoints.delete, id)
        .then((response) => {
            if (response.status === 200) {
                return JSON.parse(response.data)
            }
        })
}

export async function postAppChecked(id) {
    return true;
    return await AxiosPost(constantsState.endPoints.pushChecked, id)
        .then((response) => {
            if (response.status === 200) {
                return JSON.parse(response.data)
            }
        })
}