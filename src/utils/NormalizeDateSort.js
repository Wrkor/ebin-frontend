import { SortByNumber } from './'

export const NormalizeDateSort = arr =>
	Array.isArray(arr) && arr?.length > 0 ? SortByNumber([...arr], 'date', false) : []

export default NormalizeDateSort
