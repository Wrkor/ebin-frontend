import React from 'react'
import { useNavigate } from 'react-router-dom'
import globalConstants from '../../../config/globalConstants'
import { usePlatforms } from '../../../hooks/usePlatforms'
import { AdvMark, DateFormatter } from '../../../utils'
import { ArrowSVG, EditSVG } from '../../SVG'
import classes from './TableBodyApp.module.scss'

const TableBodyApp = ({ app }) => {
	const navigate = useNavigate()
	const { isWindowPhone, isWindowTablet } = usePlatforms()

	const onClickAppEditBtn = () => navigate(globalConstants.routes.edit.replace(':id', app.id))
	const onClickAppCardBtn = () => navigate(globalConstants.routes.app.replace(':id', app.id))

	return app.id ? (
		<tr className={classes.app}>
			<th scope='row' onClick={onClickAppCardBtn}>
				<div className='d-flex align-items-center'>
					<div>
						<img src={app.icon} alt='Иконка' />
					</div>
					<div className='ms-3'>
						<h6 className='mb-3'>{app.name}</h6>
						<h6>{app.developer}</h6>
					</div>
				</div>
			</th>
			{!isWindowPhone && (
				<>
					<th onClick={onClickAppCardBtn}>
						<div className='d-flex justify-content-center'>
							<h6>{app.access || '-'}</h6>
						</div>
					</th>

					<th onClick={onClickAppCardBtn}>
						<div className='d-flex justify-content-center'>
							<h6>{app.status || '-'}</h6>
						</div>
					</th>
					{!isWindowTablet && (
						<th onClick={onClickAppCardBtn}>
							<div className='d-flex justify-content-center'>
								<h6>{app.downloads || '-'}</h6>
							</div>
						</th>
					)}
					<th onClick={onClickAppCardBtn}>
						<div className='d-flex justify-content-center'>
							<h6>{app.lastUpdate?.version || '-'}</h6>
						</div>
					</th>
					{!isWindowTablet && (
						<>
							<th onClick={onClickAppCardBtn}>
								<div className='d-flex justify-content-center'>
									<h6>{app.lastUpdate?.date ? DateFormatter(app.lastUpdate?.date) : '-'}</h6>
								</div>
							</th>

							<th onClick={onClickAppCardBtn}>
								<div className='d-flex justify-content-center'>
									<h6>{app.reviews?.length > 0 ? AdvMark(app.reviews) : '-'}</h6>
								</div>
							</th>
						</>
					)}
				</>
			)}
			<th>
				<div className='d-flex justify-content-around align-items-center'>
					<EditSVG onClick={onClickAppEditBtn} />
					<ArrowSVG onClick={onClickAppCardBtn} />
				</div>
			</th>
		</tr>
	) : (
		<></>
	)
}

export default TableBodyApp
