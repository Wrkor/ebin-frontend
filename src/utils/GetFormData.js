export const GetFormData = data => {
	const formData = new FormData()

	for (const [key, value] of Object.entries(data))
		data[key] = Array.isArray(value)
			? value.map(el => (el instanceof Blob ? new File([el], el.name, { type: el.type }) : el))
			: value instanceof Blob
			? new File([value], value.name, { type: value.type })
			: value

	for (const [key, value] of Object.entries(data))
		Array.isArray(value)
			? value.forEach((el, index) =>
					el instanceof File
						? formData.append(key, el)
						: Object.entries(el).forEach(([keyObj, valObj]) => formData.append(`${key}[${index}][${keyObj}]`, valObj))
			  )
			: formData.set(key, value)

	return formData
}
export default GetFormData
