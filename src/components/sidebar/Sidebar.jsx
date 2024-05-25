import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import globalConstants from '../../config/globalConstants'
import { usePlatforms } from '../../hooks/usePlatforms'
import { MainSVG, UnloadSVG, UpdateSVG } from '../SVG'
import classes from './Sidebar.module.scss'

const Sidebar = ({ children }) => {
	const { isWindowPhone } = usePlatforms()
	const currentURL = useLocation().pathname

	return (
		<div className={`d-flex mt-5 fixed-bottom ${classes.container}`}>
			{!isWindowPhone && (
				<div className={`${classes.sidebar} d-flex flex-column`}>
					<Link
						to={globalConstants.routes.apps}
						className={`d-flex align-items-center my-2 ms-5 ${classes.link} ${
							currentURL === globalConstants.routes.apps && classes.active
						}`}
					>
						<MainSVG />
						<h5 className='ms-3'>Приложения</h5>
					</Link>

					<Link
						to={globalConstants.routes.update}
						className={`d-flex align-items-center my-2 ms-5 ${classes.link} ${
							currentURL === globalConstants.routes.update && classes.active
						}`}
					>
						<UpdateSVG />
						<h5 className='ms-3'>Обновление</h5>
					</Link>

					<Link
						to={globalConstants.routes.create}
						className={`d-flex align-items-center my-2 ms-5 ${classes.link} ${
							currentURL === globalConstants.routes.create && classes.active
						} `}
					>
						<UnloadSVG />
						<h5 className='ms-3'>Публикация</h5>
					</Link>
				</div>
			)}
			<div className={`d-flex align-items-center w-100 ${!isWindowPhone ? 'ms-5  ' : 'justify-content-center'}`}>
				{children}
			</div>
		</div>
	)
}

export default Sidebar
