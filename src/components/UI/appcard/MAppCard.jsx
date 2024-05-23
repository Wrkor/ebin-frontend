import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import { MButton, MSwiper } from '../'
import Review from '../../../components/review/Review'
import Update from '../../../components/update/Update'
import globalConstants from '../../../config/globalConstants'
import useActions from '../../../hooks/useActions'
import { AdvMark, DateFormatter } from '../../../utils/'
import { DownloadSVG, MarkSVG } from '../../SVG'
import classes from './MAppCard.module.scss'

const MAppCard = ({ app }) => {
	const navigate = useNavigate()
	const iconRef = useRef()
	const imagesRef = useRef()
	const { changeUpdateCreate } = useActions()

	const editBtn = () => navigate(globalConstants.routes.edit.replace(':id', app.id))

	const updateBtn = () => {
		changeUpdateCreate({ select: { name: app.id, label: app.name } }).then(({ meta }) => {
			if (meta?.requestStatus === 'fulfilled') {
				navigate(globalConstants.routes.update)
			}
		})
	}

	useEffect(() => {
		const iconViewer = iconRef?.current
			? new Viewer(iconRef?.current, {
					zIndex: 11000,
			  })
			: null
		const imagesViewer = imagesRef?.current
			? new Viewer(imagesRef?.current, {
					zIndex: 11000,
			  })
			: null
		return () => {
			!!iconViewer && iconViewer.destroy()
			!!imagesViewer && imagesViewer.destroy()
		}
	}, [iconRef, imagesRef])

	return (
		<div className={`${classes.appCard}`}>
			<div className={`d-flex justify-content-between ${classes.topic}`}>
				<div className={classes.info}>
					<div className={classes.title}>
						<h3 className={classes.name}>{app.name}</h3>
						<h6 className={classes.dev}>{app.developer}</h6>
					</div>

					<div className={`d-flex align-items-center ${classes.properties}`}>
						<div className='d-flex flex-column align-items-center'>
							<MarkSVG />
							<h6>{app?.lastUpdate?.version || '-'}</h6>
						</div>

						<div className={classes.divider}></div>

						<div className='d-flex flex-column align-items-center'>
							<DownloadSVG />
							<h6>{app?.size || '-'}</h6>
						</div>
					</div>

					<div className={`d-flex align-items-center justify-content-between mb-0 ${classes.btns}`}>
						<MButton name='Редактировать' onClick={editBtn} className='ui-size-xs' />
						<MButton name='Обновить' onClick={updateBtn} active='true' className='ui-size-xs' />
					</div>
				</div>

				<div className={classes.image}>
					<img id='app-icon' ref={iconRef} src={app.icon} alt='Иконка приложения' />
				</div>
			</div>

			<div className={classes.swiper}>
				<MSwiper className={classes.mswiper} ref={imagesRef} images={app.images} />
			</div>

			<div className={`app-container g-0 ${classes.about}`}>
				<div>
					<h4 className={classes.title}>О приложении</h4>
				</div>

				<div className={classes.description}>
					<h5 className={classes.subtitle}>Описание</h5>
					<h6>{app.description}</h6>
				</div>

				<div className={`w-100 ${classes.divider}`}></div>

				<div className={classes.info}>
					<h5 className={classes.subtitle}>Информация о приложении</h5>
					<div>
						<div className='row'>
							<div className='col'>
								<div className={classes.label}>Версия</div>
								<div className={classes.value}>{app?.lastUpdate?.version || '-'}</div>
							</div>
							<div className='col'>
								<div className={classes.label}>Последнее обновление</div>
								<div className={classes.value}>{app?.lastUpdate?.date ? DateFormatter(app.lastUpdate.date) : '-'}</div>
							</div>
						</div>

						<div className='row'>
							<div className='col'>
								<div className={classes.label}>Требование Android</div>
								<div className={classes.value}>{!!app?.min_android ? `Android ${app.min_android} и выше` : '-'}</div>
							</div>
							<div className='col'>
								<div className={classes.label}>Выпущено</div>
								<div className={classes.value}>{app?.release?.date ? DateFormatter(app.release.date) : '-'}</div>
							</div>
						</div>

						<div className='row'>
							<div className='col'>
								<div className={classes.label}>Требование IOS</div>
								<div className={classes.value}>{!!app?.min_ios ? `IOS ${app.min_ios} и выше` : '-'}</div>
							</div>
							<div className='col'>
								<div className={classes.label}>Размер</div>
								<div className={classes.value}>{app?.size || '-'}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`app-container g-0 ${classes.services}`}>
				<div className='row'>
					<div className={`col ${classes.reviews}`}>
						<h4 className={classes.title}>Отзывы</h4>
						<h6 className={classes.mark}>
							Оценка {Array.isArray(app?.reviews) && app?.reviews?.length > 0 ? AdvMark(app.reviews) : '-'}
						</h6>
						<h6 className={classes.amount}>Количество {Array.isArray(app?.reviews) ? app?.reviews?.length : 0}</h6>
						{Array.isArray(app?.reviews) && app?.reviews?.length > 0 ? (
							app.reviews.map(review => (
								<div key={review.id}>
									<Review review={review} />
								</div>
							))
						) : (
							<h5 className={classes.notice}>Отзывов нет</h5>
						)}
					</div>

					<div className={`col ${classes.updates}`}>
						<h4 className={classes.title}>Обновления</h4>
						{app?.updates?.length > 0 ? (
							app.updates.map(update => (
								<div className={classes.update} key={update.id}>
									<Update update={update} />
									{app.release?.id !== update.id && <div className={`w-100 ${classes.divider}`}></div>}
								</div>
							))
						) : (
							<h5 className={`${classes.notice} mt-4`}>Обновлений нет</h5>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MAppCard
