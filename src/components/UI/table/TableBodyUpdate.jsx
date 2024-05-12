import React from 'react'
import { MInput, MTextarea } from '../'
import { usePlatforms } from '../../../hooks/usePlatforms'
import { DateFormatter } from '../../../utils'
import { TrashSVG } from '../../SVG'
import classes from './TableBodyUpdate.module.scss'

const TableBodyUpdate = ({ onEdited, deleteUpdate, errors, index, register, update }) => {
	const { isWindowPhone } = usePlatforms()

	const onClickUpdateDeleteBtn = () => deleteUpdate(update.id)
	return update.id ? (
		<tr className={classes.app}>
			<th scope='row'>
				<div className='d-flex flex-column justify-content-center'>
					<MInput
						{...register(`appChanged.updates.${index}.version.`)}
						error={Array.isArray(errors?.appChanged?.updates) && !!errors?.appChanged?.updates[index]?.version}
						message={Array.isArray(errors?.appChanged?.updates) && errors?.appChanged?.updates[index]?.version?.message}
						onEdited={versions => onEdited({ ...update, versions })}
						className='w-100'
						placeholder='1.0.1'
					/>
				</div>
			</th>

			<th>
				<div className='d-flex flex-column justify-content-center'>
					<MTextarea
						{...register(`appChanged.updates.${index}.description`)}
						error={Array.isArray(errors?.appChanged?.updates) && !!errors?.appChanged?.updates[index]?.description}
						message={
							Array.isArray(errors?.appChanged?.updates) && errors?.appChanged?.updates[index]?.description?.message
						}
						onEdited={descriptions => onEdited({ ...update, descriptions })}
						className={`w-100 ${classes.textarea}`}
						placeholder='Добавлено...&#10;Обновлено...'
					/>
				</div>
			</th>
			{!isWindowPhone && (
				<th>
					<div className='d-flex flex-column justify-content-center'>
						<h6>{update?.date ? DateFormatter(update.date) : '-'}</h6>
					</div>
				</th>
			)}
			<th>
				<div className='d-flex flex-column justify-content-around align-items-center'>
					<TrashSVG onClick={onClickUpdateDeleteBtn} />
				</div>
			</th>
		</tr>
	) : (
		<></>
	)
}

export default TableBodyUpdate
