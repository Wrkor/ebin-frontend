import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import globalConstants from '../../config/globalConstants'
import { MainSVG, UnloadSVG, UpdateSVG } from '../SVG/'
import classes from './Canvas.module.scss'

const Canvas = () => {
	const currentURL = useLocation().pathname

	return (
		<div
			className={`offcanvas offcanvas-start ${classes.canvas}`}
			data-bs-scroll='false'
			tabIndex='-1'
			id='offcanvasMenu'
			aria-labelledby='offcanvasWithBothOptionsLabel'
		>
			<div className='offcanvas-header'>
				<Link to={globalConstants.routes.apps}>
					<h4 className={`${classes.logo} ms-4`} data-bs-dismiss='offcanvas' aria-label='Close'>
						EBin Store
					</h4>
				</Link>
			</div>
			<div className={`${classes.container} offcanvas-body d-flex flex-column`}>
				<Link
					to={globalConstants.routes.apps}
					className={`my-2 ms-4 ${classes.link} ${currentURL === globalConstants.routes.apps ? classes.active : ''}`}
				>
					<div className='d-flex align-items-center' data-bs-dismiss='offcanvas' aria-label='Close'>
						<MainSVG />
						<h5 className='ms-3'>Приложения</h5>
					</div>
				</Link>
				<Link
					to={globalConstants.routes.update}
					className={`my-2 ms-4 ${classes.link} ${currentURL === globalConstants.routes.update ? classes.active : ''}`}
				>
					<div className='d-flex align-items-center' data-bs-dismiss='offcanvas' aria-label='Close'>
						<UpdateSVG />
						<h5 className='ms-3'>Обновление</h5>
					</div>
				</Link>
				<Link
					to={globalConstants.routes.create}
					className={`my-2 ms-4 ${classes.link} ${currentURL === globalConstants.routes.create ? classes.active : ''}`}
				>
					<div className='d-flex align-items-center' data-bs-dismiss='offcanvas' aria-label='Close'>
						<UnloadSVG />
						<h5 className='ms-3'>Публикация</h5>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Canvas
