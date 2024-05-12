export const DateFormatter = today => {
	const date = new Date(today)

	let mm = date.getMonth() + 1
	let dd = date.getDate()

	if (dd < 10) dd = '0' + dd
	if (mm < 10) mm = '0' + mm

	return dd + '.' + mm + '.' + date.getFullYear()
}
export default DateFormatter
