import { createSlice } from '@reduxjs/toolkit'
import globalConstants from '../config/globalConstants'
import { useToastError, useToastSuccess } from '../hooks/useToasts'
import * as appActions from './app.actions'
import appState from './app.state'
import * as appThunks from './app.thunks'

const appSlice = createSlice({
	name: 'app',
	initialState: appState,
	reducers: appActions,
	extraReducers: builder => {
		builder
			.addCase(appThunks.setAppCashed.fulfilled, (state, { payload }) => {
				state.appCashed = payload.object
			})
			.addCase(appThunks.setAppCashed.rejected, _ => {
				useToastError(globalConstants.push.data.error)
			})
			.addCase(appThunks.setAppCreate.fulfilled, (state, { payload }) => {
				state.appCreate = payload.object
			})
			.addCase(appThunks.setAppCreate.rejected, _ => {
				useToastError(globalConstants.push.data.error)
			})
			.addCase(appThunks.setAppEdit.rejected, _ => {
				useToastError(globalConstants.push.data.error)
			})
			.addCase(appThunks.setUpdateCreate.fulfilled, (state, { payload }) => {
				state.updateCreate = payload.object
			})
			.addCase(appThunks.setUpdateCreate.rejected, _ => {
				useToastError(globalConstants.push.data.error)
			})
			.addCase(appThunks.setApps.fulfilled, (state, { payload }) => {
				state.apps = payload.objects
			})
			.addCase(appThunks.setApps.rejected, _ => {
				useToastError(globalConstants.push.data.error)
			})
			.addCase(appThunks.getApps.fulfilled, (state, { payload }) => {
				state.apps = payload.objects
			})
			.addCase(appThunks.getApps.rejected, _ => {
				useToastError(globalConstants.push.getApps.error)
			})
			.addCase(appThunks.getApp.rejected, _ => {
				useToastError(globalConstants.push.getApp.error)
			})
			.addCase(appThunks.getAppsId.rejected, _ => {
				useToastError(globalConstants.push.getApps.error)
			})
			.addCase(appThunks.getCompanies.rejected, _ => {
				useToastError(globalConstants.push.getCompanies.error)
			})
			.addCase(appThunks.postAppCreate.fulfilled, _ => {
				useToastSuccess(globalConstants.push.postAppCreate.success)
			})
			.addCase(appThunks.postAppCreate.rejected, _ => {
				useToastError(globalConstants.push.postAppCreate.error)
			})
			.addCase(appThunks.postAppEdit.fulfilled, _ => {
				useToastSuccess(globalConstants.push.postAppEdit.success)
			})
			.addCase(appThunks.postAppEdit.rejected, _ => {
				useToastError(globalConstants.push.postAppEdit.error)
			})
			.addCase(appThunks.postAppDelete.fulfilled, _ => {
				useToastSuccess(globalConstants.push.postAppDelete.success)
			})
			.addCase(appThunks.postAppDelete.rejected, _ => {
				useToastError(globalConstants.push.postAppDelete.error)
			})
			.addCase(appThunks.postUpdateCreate.fulfilled, _ => {
				useToastSuccess(globalConstants.push.postUpdateCreate.success)
			})
			.addCase(appThunks.postUpdateCreate.rejected, _ => {
				useToastError(globalConstants.push.postUpdateCreate.error)
			})
	},
})

export default appSlice
