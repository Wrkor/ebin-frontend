import { AxiosGet, AxiosPost, AxiosDelete } from "./";
import constantsState from "../store/globalConstants";
import { createAsyncThunk } from '@reduxjs/toolkit'
import {login, authLoadingStop, phone, logout} from '../store/userReducer'

// Когда появится сервер подправить скрипт
/* eslint-disable */
const user = {
    id: 124, 
    name: 'Александр', 
    lastname: 'Потапов', 
    middlename: 'Михайлович',
    status: 'Инженер контрольно-измерительных приборов',
    company_id: 153,
    phone: '77777777777',
};
const ms = 500;

export const postAuth = createAsyncThunk(
    'user/postAuth',
    async function(_, {rejectWithValue, dispatch}) {
        // setTimeout(() => {
        //     dispatch(login({object: user}));
        //     dispatch(authLoadingStop());
        // }, ms);
        // return;

        AxiosGet(constantsState.endPoints.auth)
        .then((response) => {
            if (response.status === 200) {
                dispatch(login(response.data));
            }
            dispatch(authLoadingStop());
        })
    }
)

export const postPhone = createAsyncThunk(
    'user/postPhone',
    async function(number, {rejectWithValue, dispatch}) {
        // setTimeout(() => {
        //     dispatch(phone());
        // }, ms);
        // return;

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
    async function(userData, {rejectWithValue, dispatch}) {
        // setTimeout(() => {
        //     dispatch(postAuth());
        // }, ms);
        // return;

        AxiosPost(constantsState.endPoints.login, userData)
        .then((response) => {
            if (response.status === 200) {
                dispatch(postAuth());
            }
        })
    }
)

export const postLogout = createAsyncThunk(
    'user/postLogout',
    async function(_, {rejectWithValue, dispatch}) {
        // setTimeout(() => {
        //     dispatch(logout());
        // }, ms);
        // return;

        AxiosDelete(constantsState.endPoints.logout)
        .then((response) => {
            if (response.status === 200) {
                dispatch(logout());
            }
        })
    }
)
