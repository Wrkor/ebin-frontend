import { Modal } from 'bootstrap'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import globalConstants from '../../../config/globalConstants'
import { useTheme, useUser } from '../../../hooks'
import useActions from '../../../hooks/useActions'
import { ProfileSVG } from '../../SVG/'
import classes from './UserModal.module.scss'

const UserModal = () => {
	const { postLogout } = useActions()
	const { toggleTheme } = useTheme()
	const { user } = useUser()
	const { isBlackTheme } = useTheme()
	const userModalRef = useRef()
	const navigate = useNavigate()

	const onClickChangeThemeBtn = () => toggleTheme()

	const logoutBtn = () => {
		if (window.confirm('Уверены?')) {
			Modal.getInstance(userModalRef?.current).hide()
			postLogout().then(({ meta }) => {
				if (meta?.requestStatus === 'fulfilled') {
					navigate(globalConstants.routes.main)
					navigate(0)
				}
			})
		}
	}

	return (
		<div
			id='userModal'
			ref={userModalRef}
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
			className={`modal fade ${classes.modal}`}
		>
			<div className={`modal-dialog ${classes.dialog}`}>
				<div className={`modal-content ${classes.content}`}>
					<div className={`modal-body p-0 ${classes.body}`}>
						<div className='d-flex align-items-center m-4'>
							<div className={`ms-2 ${classes.profileSVG}`}>
								<ProfileSVG />
							</div>
							<h5 className='modal-title ms-3'>
								{user.name}
								<br />
								{user.middleName}
							</h5>
						</div>
						<div className='d-flex flex-column justify-content-center mb-4'>
							<h5 className='modal-subtitle mb-3' onClick={onClickChangeThemeBtn}>
								{isBlackTheme ? 'Темная тема' : 'Светлая тема'}
							</h5>
							<h5 className='modal-subtitle mb-2' onClick={logoutBtn} data-bs-dismiss='userModal' aria-label='Close'>
								Выйти
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserModal
