import { yupResolver } from '@hookform/resolvers/yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { MButton, MInput } from '../components/UI'
import { authSchema } from '../config/validationSchema'
import { usePlatforms } from '../hooks'
import useActions from '../hooks/useActions'
import '../styles/Auth.scss'

const Auth = () => {
	const isEnterPhone = useSelector(state => state.user.isEnterPhone)
	const { isWindowPhone } = usePlatforms()
	const { postLogin, postPhone, postAuth } = useActions()

	const {
		register,
		getValues,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			phone: '',
			code: '',
		},
		mode: 'onTouched',
		resolver: yupResolver(authSchema),
	})

	const normalizePhoneNumber = value => {
		if (!!value) {
			if (value.length === 1) {
				value = value[0] !== '+' ? (value[0] !== '7' ? '+7' + value : '+' + value) : value
			} else if (value.length > 1) {
				value = !value.startsWith('+7') ? '+7' + value.replace('+', '') : value
			}
		}
		const phone = parsePhoneNumberFromString(value)

		return phone ? phone.formatInternational() : value
	}

	async function onClickPostLogin() {
		if (await trigger(['phone', 'code']))
			postLogin({
				phone: getValues('phone').replaceAll(' ', ''),
				code: getValues('code'),
			}).then(response => response?.meta?.requestStatus === 'fulfilled' && postAuth())
	}

	async function onClickPostPhone() {
		if (await trigger('phone')) postPhone(getValues('phone').replaceAll(' ', ''))
	}

	return (
		<div className='form-auth d-flex flex-column align-items-center w-100'>
			<h1>Эн+ Маркет</h1>
			{isEnterPhone ? (
				<>
					<h6>Введите код отправленный на телефон</h6>
					<MInput
						{...register('code')}
						error={!!errors?.code}
						message={errors?.code?.message}
						className={`${isWindowPhone ? 'ui-size-s' : 'ui-size-m'}`}
						placeholder='Код'
					/>
					<MButton name='Далее' onClick={onClickPostLogin} className='ui-size-m' />
				</>
			) : (
				<>
					<h6>Введите свой номер телефона</h6>
					<MInput
						{...register('phone')}
						error={!!errors?.phone}
						message={errors?.phone?.message}
						onChange={e => (e.target.value = normalizePhoneNumber(e.target.value))}
						className={`${isWindowPhone ? 'ui-size-s' : 'ui-size-m'}`}
						placeholder='+7(___)-___-____'
					/>
					<MButton name='Далее' onClick={onClickPostPhone} className={`${isWindowPhone ? 'ui-size-s' : 'ui-size-m'}`} />
				</>
			)}
		</div>
	)
}

export default Auth
