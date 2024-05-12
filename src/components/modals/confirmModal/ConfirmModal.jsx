import React from 'react'
import { MButton } from '../../UI/'
import classes from './UserModal.module.scss'

const ConfirmModal = ({ nameTrueBtn, nameFalseBtn, onTrue, onFalse, text }) => {
	const onClickTrueBtn = () => onTrue()
	const onClickFalseBtn = () => onFalse()

	return (
		<div
			id='confirmModal'
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
			className={`modal fade ${classes.modal}`}
		>
			<div className={`modal-dialog ${classes.dialog}`}>
				<div className={`modal-content ${classes.content}`}>
					<div className={`modal-body p-0 ${classes.body}`}>
						<div className='d-flex flex-column justify-content-center mb-4'>
							<h5>{text}</h5>
							<MButton
								name={nameFalseBtn}
								onClick={onClickTrueBtn}
								data-toggle='modal'
								data-target='#confirmModal'
								className={'ui-size-xs'}
							/>
							<MButton
								name={nameTrueBtn}
								onClick={onClickFalseBtn}
								active
								data-toggle='modal'
								data-target='#confirmModal'
								className={'ui-size-xs'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
