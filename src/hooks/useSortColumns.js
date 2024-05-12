import { useState } from 'react'

export const useSortColumns = cols => {
	const [colSorted, setColSorted] = useState(cols)

	const sortColumns = (col, SortBy, onClickSortBtn) => {
		if (col.sorted === 1) {
			setColSorted(
				colSorted.map(el => {
					return { ...el, sorted: el.key === col.key ? -1 : 0 }
				})
			)
			onClickSortBtn(col.key, SortBy, false)
		} else if (col.sorted === 0 || col.sorted === -1) {
			setColSorted(
				colSorted.map(el => {
					return { ...el, sorted: el.key === col.key ? 1 : 0 }
				})
			)
			onClickSortBtn(col.key, SortBy, true)
		}
	}
	return { sortColumns, colSorted }
}
