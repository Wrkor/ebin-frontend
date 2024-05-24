import React from 'react'
import { Title } from '../components/UI'
import { useUser } from '../hooks'

const Error404 = () => {
	const { isAuth } = useUser()
	return (
		<Title
			className={`${!isAuth ? 'mt-5 d-flex flex-column align-items-center' : ''}`}
			title='Ошибка 404. Ресурс не найден'
			subtitle='Проверьте правильность введенного URL адреса'
		/>
	)
}

export default Error404
