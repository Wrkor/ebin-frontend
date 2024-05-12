import React from 'react'
import { useSortColumns } from '../../../hooks/'
import { usePlatforms } from '../../../hooks/usePlatforms.js'
import { SortByName, SortByNumber } from '../../../utils/'
import TableHeader from './TableHeader'
import classes from './TableHeaderUpdate.module.scss'

const TableHeaderUpdate = ({ onClickSortBtn }) => {
	const { isWindowPhone } = usePlatforms()
	const { sortColumns, colSorted } = useSortColumns([
		{ key: 'version', sorted: 1 },
		{ key: 'description', sorted: 0 },
		{ key: 'date', sorted: 0 },
	])

	return (
		<tr className={classes.app}>
			<TableHeader
				isSort={colSorted[0].sorted}
				onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[0], SortByNumber, onClickSortBtn)}
				title='Версия'
			/>

			<TableHeader
				isSort={colSorted[1].sorted}
				onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[1], SortByName, onClickSortBtn)}
				title='Информация об обновлении'
			/>
			{!isWindowPhone && (
				<TableHeader
					isSort={colSorted[2].sorted}
					onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[2], SortByNumber, onClickSortBtn)}
					title='Дата'
				/>
			)}
			<th scope='col'></th>
		</tr>
	)
}

export default TableHeaderUpdate
