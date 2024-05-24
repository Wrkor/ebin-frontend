import { SortByNumber } from './'

export const NormalizeDateSort = arr =>
	!!arr && Array.isArray(arr) && arr?.length > 0 ? SortByNumber([...arr], 'date', false) : []

export default NormalizeDateSort
