import axios from 'axios'
import globalConstants from '../config/globalConstants'

axios.defaults.withCredentials = true

export async function AxiosGet(partUrl, URLParams) {
	return await axios
		.get(globalConstants.api + partUrl, {
			params: URLParams,
			headers: {
				'Content-Type': 'application/json',
			},
			validateStatus: () => true,
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('error(AxiosGet)\n', error)
		})
}

export async function AxiosPost(partUrl, data, URLParams) {
	return await axios
		.post(globalConstants.api + partUrl, JSON.stringify(data), {
			params: URLParams,
			headers: {
				'Content-Type': 'application/json',
			},
			validateStatus: () => true,
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('error(AxiosPost)\n', error.toJSON())
		})
}

export async function AxiosDelete(partUrl, URLParams) {
	return await axios
		.delete(globalConstants.api + partUrl, {
			params: URLParams,
			headers: {
				'Content-Type': 'application/json',
			},
			validateStatus: () => true,
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('error(AxiosDelete)\n', error.toJSON())
		})
}

export async function AxiosFormPost(partUrl, data) {
	return await axios
		.post(globalConstants.api + partUrl, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			validateStatus: () => true,
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('error(AxiosFormPost)\n', error.toJSON())
		})
}

export async function AxiosFormPut(partUrl, data) {
	return await axios
		.put(globalConstants.api + partUrl, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			validateStatus: () => true,
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('error(AxiosFormPut)\n', error.toJSON())
		})
}
