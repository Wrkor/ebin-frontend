import { toast } from 'react-toastify'

export const useToastError = ({ message }) => {
	const toastError = toast.error(`😔 ${message}`, {
		autoClose: 3000,
		progress: undefined,
	})

	return toastError
}

export const useToastSuccess = ({ message }) => {
	const toastSuccess = toast.success(`🦄 ${message}`, {
		autoClose: 3000,
		progress: undefined,
	})

	return toastSuccess
}
