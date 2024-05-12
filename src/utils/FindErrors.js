import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.js'
import globalConstants from '../config/globalConstants'
import { useToastError as toastError } from '../hooks'

export async function FindErrors(getFieldState, setFocus, trigger, triggers) {
	const fields = Object.keys(triggers)
	if (!(await trigger(fields))) {
		const focus = Array.isArray(fields) ? fields.find(field => getFieldState(field).invalid) : ''
		if (!!focus) {
			try {
				new Tab(triggers[focus])?.show()
				setFocus(focus)
				toastError(globalConstants.push.validate.error)
			} catch (e) {}
		}
		return true
	}

	return false
}

export default FindErrors
