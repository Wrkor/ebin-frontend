import { AxiosPost } from "./";
import constantsState from "../store/globalConstants";
import { createAsyncThunk } from '@reduxjs/toolkit'
import {login, authLoadingStop, phone, logout} from '../store/userReducer'

// Когда появится сервер подправить скрипт
/* eslint-disable */
const user = {
    id: 124, 
    fullname: {
        first: 'Александр', 
        last: 'Потапов', 
        father: 'Михайлович'
    },
    status: 'Инженер контрольно-измерительных приборов',
    company_id: 153,
    phone: '77777777777',
};
const ms = 500;

export const postAuth = createAsyncThunk(
    'user/postAuth',
    async function(_, {rejectWithValue, dispatch}) {
        setTimeout(() => {
            dispatch(login({user}));
            dispatch(authLoadingStop());
        }, ms);
        return;

        AxiosPost(constantsState.endPoints.auth)
        .then((response) => {
            if (response.status === 200) {
                dispatch(authLoadingStop());
                dispatch(login(JSON.parse(response.data)));
            }
        })
    }
)

export const postPhone = createAsyncThunk(
    'user/postPhone',
    async function(number, {rejectWithValue, dispatch}) {
        setTimeout(() => {
            dispatch(phone());
        }, ms);
        return;

        AxiosPost(constantsState.endPoints.phone, number)
        .then((response) => {
            if (response.status === 200) {
                dispatch(phone());
            }
        })
    }
)

export const postLogin = createAsyncThunk(
    'user/postLogin',
    async function({number, code}, {rejectWithValue, dispatch}) {
        setTimeout(() => {
            dispatch(login({user}));
        }, ms);
        return;

        AxiosPost(constantsState.endPoints.phone, {number, code})
        .then((response) => {
            if (response.status === 200) {
                dispatch(login(JSON.parse(response.data)));
            }
        })
    }
)

export const postLogout = createAsyncThunk(
    'user/postLogout',
    async function(_, {rejectWithValue, dispatch}) {
        setTimeout(() => {
            dispatch(logout());
        }, ms);
        return;

        AxiosPost(constantsState.endPoints.logout)
        .then((response) => {
            if (response.status === 200) {
                dispatch(logout());
            }
        })
    }
)
