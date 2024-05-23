export const globalConstants = {
	routes: {
		any: '*',
		main: '/',
		login: '/login',
		error404: '/404',
		apps: '/apps',
		app: '/apps/:id',
		create: '/apps/create',
		update: '/apps/update',
		edit: '/apps/edit/:id',
	},
	endPoints: {
		auth: '/api/users',
		phone: '/api/users/code',
		login: '/api/users/auth',
		logout: '/api/users/logout',
		apps: '/api/apps',
		companies: '/api/companies',
		app: '/api/apps',
		create: '/api/apps',
		update: '/api/apps/update',
		edit: '/api/apps',
		delete: '/api/apps',
		pushChecked: '/api/push',
	},
	//api: 'https://localhost:7252',
	api: 'http://localhost:8000',
	//api: 'http://77.222.60.86:8000',
	localStorage: {
		theme: {
			key: 'Theme',
			white: 'White',
			dark: 'Dark',
		},
	},
	select: {
		status: [
			{
				value: 'Рабочая версия',
				label: 'Рабочая версия',
			},
			{
				value: 'Тестирование',
				label: 'Тестирование',
			},
		],
		access: [
			{
				value: 'Общий',
				label: 'Общий',
			},
			{
				value: 'Закрытый',
				label: 'Закрытый',
			},
			{
				value: 'Частичный',
				label: 'Частичный',
			},
		],
	},
	ext: {
		images: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/bmp'],
		android: ['application/vnd.android.package-archive'],
	},
	push: {
		phone: {
			success: {
				type: 'success',
				title: 'Авторизация',
				message: 'Введите код, отправленный на номер телефона',
			},
			error: {
				type: 'error',
				title: 'Авторизация',
				message: 'Неверный номер телефона',
			},
		},
		login: {
			success: {
				type: 'success',
				title: 'Авторизация',
				message: 'Успешный вход',
			},
			error: {
				type: 'error',
				title: 'Авторизация',
				message: 'Неверный код',
			},
		},
		logout: {
			success: {
				type: 'success',
				title: 'Авторизация',
				message: 'Успешный выход',
			},
			error: {
				type: 'error',
				title: 'Авторизация',
				message: 'Ошибка выхода',
			},
		},
		getApps: {
			error: {
				type: 'error',
				title: 'Получение приложений',
				message: 'Ошибка получения приложений',
			},
		},
		getCompanies: {
			error: {
				type: 'error',
				title: 'Получение компаний',
				message: 'Ошибка получения компаний',
			},
		},
		getApp: {
			error: {
				type: 'error',
				title: 'Получение приложения',
				message: 'Ошибка получения приложения',
			},
		},
		postAppCreate: {
			success: {
				type: 'success',
				title: 'Добавление приложения',
				message: 'Приложение успешно добавлено',
			},
			error: {
				type: 'error',
				title: 'Добавление приложения',
				message: 'Не удалось добавить приложение',
			},
		},
		postAppEdit: {
			success: {
				type: 'success',
				title: 'Изменение приложения',
				message: 'Приложение успешно изменено',
			},
			error: {
				type: 'error',
				title: 'Изменение приложения',
				message: 'Не удалось изменить приложение',
			},
		},
		postAppDelete: {
			success: {
				type: 'success',
				title: 'Удаление приложения',
				message: 'Приложение успешно удалено',
			},
			error: {
				type: 'error',
				title: 'Удаление приложения',
				message: 'Не удалось удалить приложение',
			},
		},
		postUpdateCreate: {
			success: {
				type: 'success',
				title: 'Добавление обновления',
				message: 'Обновление успешно добавлено',
			},
			error: {
				type: 'error',
				title: 'Добавление обновления',
				message: 'Не удалось добавить обновление',
			},
		},
		data: {
			error: {
				type: 'error',
				title: 'Получение данных с сервера',
				message: 'Некорректная работа сервера',
			},
		},
		validate: {
			error: {
				type: 'error',
				title: 'Ошибка валидации',
				message: 'Некорректные введенные данные! Проверьте форму',
			},
		},
	},
}

export default globalConstants
