import React from 'react'
import { useSortColumns } from '../../../hooks'
import { usePlatforms } from '../../../hooks/usePlatforms.js'
import { SortByName, SortByNumber } from '../../../utils/'
import TableHeader from './TableHeader'
import classes from './TableHeaderApp.module.scss'

const TableHeaderApp = ({ onClickSortBtn }) => {
	const { isWindowPhone, isWindowTablet } = usePlatforms()
	const { sortColumns, colSorted } = useSortColumns([
		{ key: 'name', sorted: 1 },
		{ key: 'access', sorted: 0 },
		{ key: 'status', sorted: 0 },
		{ key: 'downloads', sorted: 0 },
		{ key: 'version', sorted: 0 },
		{ key: 'lastUpdate/date', sorted: 0 },
		{ key: 'lastUpdate/rating', sorted: 0 },
	])

	return (
		<tr className={classes.app}>
			<TableHeader
				isSort={colSorted[0].sorted}
				onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[0], SortByName, onClickSortBtn)}
				title='Приложения'
			/>
			{!isWindowPhone && (
				<>
					<TableHeader
						isSort={colSorted[1].sorted}
						onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[1], SortByName, onClickSortBtn)}
						title='Доступ'
					/>

					<TableHeader
						isSort={colSorted[2].sorted}
						onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[2], SortByName, onClickSortBtn)}
						title='Статус'
					/>
					{!isWindowTablet && (
						<TableHeader
							isSort={colSorted[3].sorted}
							onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[3], SortByNumber, onClickSortBtn)}
							title='Загружено'
						/>
					)}
					<TableHeader
						isSort={colSorted[4].sorted}
						onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[4], SortByNumber, onClickSortBtn)}
						title='Версия'
					/>
					{!isWindowTablet && (
						<>
							<TableHeader
								isSort={colSorted[5].sorted}
								onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[5], SortByNumber, onClickSortBtn)}
								title='Обновление'
							/>

							<TableHeader
								isSort={colSorted[6].sorted}
								onClickSortBtn={() => onClickSortBtn && sortColumns(colSorted[6], SortByNumber, onClickSortBtn)}
								title='Оценка'
							/>
						</>
					)}
				</>
			)}
			<th scope='col'></th>
		</tr>
	)
}

export default TableHeaderApp
