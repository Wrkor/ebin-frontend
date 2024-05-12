import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosDelete, AxiosFormPost, AxiosFormPut, AxiosGet } from '../API/'
import globalConstants from '../config/globalConstants'
import { reviews } from '../data/app.data'
import { GetFormData, NormalizeDateSort, NormalizeSelect, NormalizeStringToArrayImgs } from '../utils'

export const postUpdateCreate = createAsyncThunk('app/postUpdateCreate', async (data, { rejectWithValue }) => {
	const response = await AxiosFormPost(globalConstants.endPoints.update, GetFormData(data))

	return response.status === 200
		? true
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const postAppCreate = createAsyncThunk('app/postAppCreate', async (data, { rejectWithValue }) => {
	const response = await AxiosFormPost(globalConstants.endPoints.create, GetFormData(data))

	return response.status === 200
		? true
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const postAppEdit = createAsyncThunk('app/postAppEdit', async (data, { rejectWithValue }) => {
	const response = await AxiosFormPut(globalConstants.endPoints.edit, GetFormData(data))

	return response.status === 200
		? true
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const postAppDelete = createAsyncThunk('app/postAppDelete', async (appId, { rejectWithValue }) => {
	const response = await AxiosDelete(globalConstants.endPoints.delete, appId)

	return response.status === 200
		? true
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const getApp = createAsyncThunk('app/getApp', async ({ id }, { rejectWithValue }) => {
	const response = await AxiosGet(`${globalConstants.endPoints.app}/${id}`)

	//TODO
	if (response.status === 200) response.data.object.reviews = reviews

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const getAppsId = createAsyncThunk('app/getAppsId', async (_, { rejectWithValue }) => {
	const response = await AxiosGet(globalConstants.endPoints.apps, { isShort: true })

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const getCompanies = createAsyncThunk('app/getCompanies', async (_, { rejectWithValue }) => {
	const response = await AxiosGet(globalConstants.endPoints.companies)

	return response.status === 200
		? response.data
		: rejectWithValue({
				message: response?.data?.message,
				status: response?.status,
				statusText: response?.statusText,
		  })
})

export const getApps = createAsyncThunk('app/getApps', async (_, { rejectWithValue }) => {
	const response = await AxiosGet(globalConstants.endPoints.apps)

	if (response.status !== 200) {
		return rejectWithValue({
			message: response?.data?.message,
			status: response?.status,
			statusText: response?.statusText,
		})
	}

	const apps = Array.isArray(response?.data?.objects)
		? await response?.data?.objects?.map(object => {
				if (!!!object.id || !!!object?.lastUpdate?.id) return rejectWithValue({})

				return {
					...object,
					reviews: NormalizeDateSort(object.reviews),
					icon: !!object.icon ? `${globalConstants.api}/${object.icon}` : '',
				}
		  })
		: []

	return { objects: apps }
})

export const setApps = createAsyncThunk('app/setApps', async objects =>
	Array.isArray(objects) ? { objects } : { objects: [] }
)

export const setAppCashed = createAsyncThunk('app/setAppCashed', async ({ object }, { rejectWithValue }) => {
	if (!!!object?.id || !Array.isArray(object.updates) || object.updates.length === 0) return rejectWithValue({})

	const updates = NormalizeDateSort(object.updates).map(update => {
		return {
			...update,
			filePath: !!update.filePath ? `${globalConstants.api}/${update.filePath}` : '',
		}
	})

	return {
		object: {
			...object,
			reviews: NormalizeDateSort(object.reviews),
			updates,
			lastUpdate: updates[0],
			release: updates.at(-1),
			images: NormalizeStringToArrayImgs(object.images),
			icon: !!object.icon ? `${globalConstants.api}/${object.icon}` : '',
		},
	}
})

export const clearAppCashed = createAsyncThunk('app/setAppCashed', async _ => {
	return { object: {} }
})

export const setAppCreate = createAsyncThunk('app/setAppCreate', async object => (object ? { object } : { object: {} }))

export const changeAppCreate = createAsyncThunk('app/setAppCreate', async (object, { getState }) => {
	return {
		object: {
			...getState()?.app?.appCreate,
			...object,
		},
	}
})

export const setUpdateCreate = createAsyncThunk('app/setUpdateCreate', async ({ object }, { rejectWithValue }) => {
	if (!!!object?.id || !Array.isArray(object.updates) || object.updates.length === 0) return rejectWithValue({})

	const updates = NormalizeDateSort(object.updates).map(update => {
		return {
			...update,
			filePath: !!update.filePath ? `${globalConstants.api}/${update.filePath}` : '',
		}
	})

	return {
		object: {
			testFlight: object?.lastUpdate?.testFlight || '',
			select: { name: object.id, label: object.name },
			app: {
				...object,
				reviews: NormalizeDateSort(object.reviews),
				updates,
				lastUpdate: updates[0],
				release: updates.at(-1),
				images: NormalizeStringToArrayImgs(object.images),
				icon: !!object.icon ? `${globalConstants.api}/${object.icon}` : '',
			},
		},
	}
})

export const changeUpdateCreate = createAsyncThunk('app/setUpdateCreate', async (object, { getState }) => {
	return {
		object: {
			...getState()?.app?.updateCreate,
			...object,
		},
	}
})

export const clearUpdateCreate = createAsyncThunk('app/setUpdateCreate', async _ => {
	return { object: {} }
})

export const setAppEdit = createAsyncThunk('app/setAppEdit', async ({ object }, { rejectWithValue }) => {
	if (!!!object?.id || !Array.isArray(object.updates) || object.updates.length === 0) return rejectWithValue({})

	const updates = NormalizeDateSort(object.updates).map(update => {
		return {
			...update,
			filePath: !!update.filePath ? `${globalConstants.api}/${update.filePath}` : '',
		}
	})
	const app = {
		...object,
		reviews: NormalizeDateSort(object.reviews),
		updates,
		lastUpdate: updates[0],
		release: updates.at(-1),
		images: NormalizeStringToArrayImgs(object.images),
		status: NormalizeSelect(object.status),
		access: NormalizeSelect(object.access),
		companies:
			Array.isArray(object.companies) && object.companies.length > 0
				? object.companies.map(company => {
						return { name: company.id, label: company.name }
				  })
				: [],
		icon: !!object.icon ? [`${globalConstants.api}/${object.icon}`] : '',
	}

	return {
		object: {
			...app,
			app,
			isAndroid: !!object?.lastUpdate?.filePath?.length,
			isIos: !!object?.lastUpdate?.testFlight?.length,
			testFlight: object?.lastUpdate?.testFlight || '',
			apk: !!object?.lastUpdate?.filePath ? [`${globalConstants.api}/${object?.lastUpdate?.filePath}`] : '',
		},
	}
})
