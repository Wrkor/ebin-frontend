import React from 'react'
import { useNavigate } from 'react-router-dom'
import globalConstants from '../../../config/globalConstants'
import { useActions } from '../../../hooks'
import { usePlatforms } from '../../../hooks/usePlatforms'
import { DateFormatter } from '../../../utils'
import { TrashSVG } from '../../SVG'
import classes from './TableBodyAppDelete.module.scss'

const TableBodyAppDelete = ({ app }) => {
	const { isWindowPhone, isWindowTablet } = usePlatforms()
	const { postAppDelete } = useActions()
	const navigate = useNavigate()

	const onClickAppDeleteBtn = () => {
		if (window.confirm('Уверены?')) {
			postAppDelete({ appId: app.id }).then(({ meta }) => {
				if (meta?.requestStatus === 'fulfilled') {
					navigate(globalConstants.routes.apps)
				}
			})
		}
	}

	return !!app?.id ? (
		<tr className={classes.app}>
			<th scope='row'>
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
					<th>
						<div className='d-flex justify-content-center'>
							<h6>{app?.access?.value || '-'}</h6>
						</div>
					</th>

					<th>
						<div className='d-flex justify-content-center'>
							<h6>{!!app?.status?.value ? app?.status?.value : '-'}</h6>
						</div>
					</th>
					{!isWindowTablet && (
						<th>
							<div className='d-flex justify-content-center'>
								<h6>{app.downloads ? app.downloads : '0'}</h6>
							</div>
						</th>
					)}
					<th>
						<div className='d-flex justify-content-center'>
							<h6>{app?.lastUpdate?.version || '-'}</h6>
						</div>
					</th>
					{!isWindowTablet && (
						<>
							<th>
								<div className='d-flex justify-content-center'>
									<h6>{!!app?.lastUpdate?.date ? DateFormatter(app.lastUpdate.date) : '-'}</h6>
								</div>
							</th>

							<th>
								<div className='d-flex justify-content-center'>
									<h6>{app.rating ? app.rating : '-'}</h6>
								</div>
							</th>
						</>
					)}
				</>
			)}
			<th>
				<div className='d-flex justify-content-around align-items-center'>
					<TrashSVG onClick={onClickAppDeleteBtn} />
				</div>
			</th>
		</tr>
	) : (
		<></>
	)
}

export default TableBodyAppDelete
