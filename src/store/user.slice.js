import { createSlice } from '@reduxjs/toolkit'
import globalConstants from '../config/globalConstants'
import { useToastError, useToastSuccess } from '../hooks/useToasts'
import * as userActions from './user.actions'
import userState from './user.state'
import * as userThunks from './user.thunks'

const userSlice = createSlice({
	name: 'user',
	initialState: userState,
	reducers: userActions,
	extraReducers: builder => {
		builder
			.addCase(userThunks.postPhone.fulfilled, state => {
				state.isEnterPhone = true

				useToastSuccess(globalConstants.push.phone.success)
			})
			.addCase(userThunks.postPhone.rejected, (state, { payload }) => {
				!!payload?.status
					? useToastError({
							...globalConstants.push.phone.error,
							status: payload?.status,
							statusText: payload?.statusText,
					  })
					: useToastError({ ...globalConstants.push.data.error })
				state.isEnterPhone = false
			})
			.addCase(userThunks.postAuth.pending, state => {
				state.isAuthLoading = true
				state.isAuth = false
			})
			.addCase(userThunks.postAuth.fulfilled, (state, { payload }) => {
				state.user = payload.object
				state.isAuth = true
				state.isEnterPhone = true
				state.isAuthLoading = false
				useToastSuccess(globalConstants.push.login.success)
			})
			.addCase(userThunks.postAuth.rejected, state => {
				state.isAuthLoading = false
			})
			.addCase(userThunks.postLogin.rejected, (state, { payload }) => {
				!!payload?.status
					? useToastError({
							...globalConstants.push.login.error,
							status: payload?.status,
							statusText: payload?.statusText,
					  })
					: useToastError({ ...globalConstants.push.data.error })
				state.isAuthLoading = false
			})
			.addCase(userThunks.postLogout.fulfilled, state => {
				state.user = {}
				state.isAuth = false
				state.isEnterPhone = false
				state.isAuthLoading = false
				useToastSuccess(globalConstants.push.logout.success)
			})
			.addCase(userThunks.postLogout.rejected, (_, { payload }) => {
				!!payload?.status
					? useToastError({
							...globalConstants.push.phone.error,
							status: payload?.status,
							statusText: payload?.statusText,
					  })
					: useToastError({ ...globalConstants.push.logout.error })
			})
	},
})

export default userSlice
