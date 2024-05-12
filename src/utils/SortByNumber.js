export const SortByNumber = (arr, key, isEnc = true) => {
	if (!Array.isArray(arr) || arr.length === 0) return []

	if (isEnc) {
		if (key.includes('/')) {
			const keys = key.split('/')
			return arr.sort((a, b) => a[keys[0]][keys[1]] - b[keys[0]][keys[1]])
		} else {
			return arr.sort((a, b) => a[key] - b[key])
		}
	} else {
		if (key.includes('/')) {
			const keys = key.split('/')
			return arr.sort((a, b) => b[keys[0]][keys[1]] - a[keys[0]][keys[1]])
		} else {
			return arr.sort((a, b) => b[key] - a[key])
		}
	}
}
export default SortByNumber
