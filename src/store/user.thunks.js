import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosDelete, AxiosGet, AxiosPost } from '../API/'
import globalConstants from '../config/globalConstants'

export const postAuth = createAsyncThunk('user/postAuth', async (_, { rejectWithValue }) => {
	const response = await AxiosGet(globalConstants.endPoints.auth)

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const postPhone = createAsyncThunk('user/postPhone', async (number, { rejectWithValue }) => {
	const response = await AxiosPost(globalConstants.endPoints.phone, number)

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const postLogin = createAsyncThunk('user/postLogin', async (userData, { rejectWithValue }) => {
	const response = await AxiosPost(globalConstants.endPoints.login, userData)

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const postLogout = createAsyncThunk('user/postLogout', async (_, { rejectWithValue }) => {
	const response = await AxiosDelete(globalConstants.endPoints.logout)

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})
