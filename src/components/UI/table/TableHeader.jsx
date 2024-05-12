import React from 'react'
import { ChevronSVG } from '../../SVG'
import classes from './TableHeader.module.scss'

const TableHeader = ({ onClickSortBtn, isSort, title }) => {
	return (
		<th scope='col'>
			<div
				onClick={onClickSortBtn}
				className={`d-flex flex-row align-items-center justify-content-center ${classes.col}`}
			>
				<h6>{title}</h6>
				<ChevronSVG
					className={`ms-2 mt-1 ${isSort === 1 ? classes.activeEnc : isSort === -1 ? classes.activeDec : 'opacity-0'}`}
				/>
			</div>
		</th>
	)
}

export default TableHeader
