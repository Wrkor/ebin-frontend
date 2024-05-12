import * as yup from 'yup'

const yupConstants = {
	minText: 10,
	maxText: 4000,
	minVersion: 1,
	maxVersion: 10,
	minName: 2,
	maxName: 50,
	countApk: 1,
	countIcon: 1,
	minImgs: 0,
	maxImgs: 10,
	minCompanies: 1,
}

export const authSchema = yup.object().shape({
	phone: yup.string('', 'Необходимо ввести телефон').required('Необходимо ввести телефон'),
	code: yup.string('Неккоректно введеный код').required('Необходимо ввести код'),
})

export const appEditSchema = yup.object().shape({
	appChanged: yup.object({
		name: yup
			.string()
			.required('Необходимо дать имя')
			.min(yupConstants.minName, `Имя должно быть больше ${yupConstants.minName} символов`)
			.max(yupConstants.maxName, `Имя должно быть меньше ${yupConstants.maxName} символов`),
		description: yup
			.string()
			.required('Необходимо дать описать')
			.min(yupConstants.minText, `Описание должно быть больше ${yupConstants.minText} символов`)
			.max(yupConstants.maxText, `Описание должно быть меньше ${yupConstants.maxText} символов`),
		min_ios: yup
			.string()
			.required('Необходимо указать версию')
			.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
			.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
		min_android: yup
			.string()
			.required('Необходимо указать версию')
			.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
			.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
		version: yup
			.string()
			.required('Необходимо указать версию')
			.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
			.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
		testFlight: yup.string().required('Необходима ссылка на приложение в TestFlight').url('Ссылка некорректна'),
		status: yup
			.object({
				value: yup.string().required('Необходимо выбрать статус приложение'),
			})
			.required('Необходимо выбрать статус приложение'),
		access: yup
			.object({
				value: yup.string().required('Необходимо выбрать доступ к приложению'),
			})
			.required('Необходимо выбрать доступ к приложению'),
		companies: yup
			.array()
			.required('Необходимо выбрать компании, имеющие доступ к приложению')
			.min(yupConstants.minCompanies, `Необходимо выбрать хотя бы ${yupConstants.minCompanies} компанию`),
		apk: yup
			.array()
			.length(yupConstants.countApk, 'Необходимо загрузить файл APK')
			.required('Необходимо загрузить файл APK'),
		icon: yup
			.array()
			.length(yupConstants.countIcon, 'Необходимо загрузить исконку')
			.required('Необходимо загрузить исконку'),
		images: yup.array(),
		updates: yup.array().of(
			yup.object({
				version: yup
					.string()
					.required('Необходимо указать версию')
					.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
					.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
				description: yup
					.string()
					.required('Необходимо дать описать')
					.min(yupConstants.minText, `Описание должно быть больше ${yupConstants.minText} символов`)
					.max(yupConstants.maxText, `Описание должно быть меньше ${yupConstants.maxText} символов`),
			})
		),
	}),
})

export const appCreateSchema = yup.object().shape({
	name: yup
		.string()
		.required('Необходимо дать имя')
		.min(yupConstants.minName, `Имя должно быть больше ${yupConstants.minName} символов`)
		.max(yupConstants.maxName, `Имя должно быть меньше ${yupConstants.maxName} символов`),
	description: yup
		.string()
		.required('Необходимо дать описать')
		.min(yupConstants.minText, `Описание должно быть больше ${yupConstants.minText} символов`)
		.max(yupConstants.maxText, `Описание должно быть меньше ${yupConstants.maxText} символов`),
	min_ios: yup
		.string()
		.required('Необходимо указать версию')
		.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
		.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
	min_android: yup
		.string()
		.required('Необходимо указать версию')
		.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
		.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
	version: yup
		.string()
		.required('Необходимо указать версию')
		.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
		.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
	testFlight: yup.string().required('Необходима ссылка на приложение в TestFlight').url('Ссылка некорректна'),
	status: yup
		.object({
			value: yup.string().required('Необходимо выбрать статус приложение'),
		})
		.required('Необходимо выбрать статус приложение'),
	access: yup
		.object({
			value: yup.string().required('Необходимо выбрать доступ к приложению'),
		})
		.required('Необходимо выбрать доступ к приложению'),
	companies: yup
		.array()
		.required('Необходимо выбрать компании, имеющие доступ к приложению')
		.min(yupConstants.minCompanies, `Необходимо выбрать хотя бы ${yupConstants.minCompanies} компанию`),
	apkFile: yup
		.array()
		.length(yupConstants.countApk, 'Необходимо загрузить файл APK')
		.required('Необходимо загрузить файл APK'),
	iconFile: yup
		.array()
		.length(yupConstants.countIcon, 'Необходимо загрузить исконку')
		.required('Необходимо загрузить исконку'),
	imagesFiles: yup.array(),
})

export const updateCreateSchema = yup.object().shape({
	description: yup
		.string()
		.required('Необходимо дать описать')
		.min(yupConstants.minText, `Описание должно быть больше ${yupConstants.minText} символов`)
		.max(yupConstants.maxText, `Описание должно быть меньше ${yupConstants.maxText} символов`),
	select: yup
		.object({
			name: yup
				.number('Необходимо выбрать приложение из маркета')
				.required('Необходимо выбрать приложение из маркета')
				.positive('Необходимо выбрать приложение из маркета'),
		})
		.required('Необходимо выбрать приложение из маркета'),
	testFlight: yup.string().required('Необходима ссылка на приложение в TestFlight').url('Ссылка некорректна'),
	apkFile: yup
		.array()
		.length(yupConstants.countApk, 'Необходимо загрузить файл APK')
		.required('Необходимо загрузить файл APK'),
	version: yup
		.string()
		.required('Необходимо указать версию')
		.min(yupConstants.minVersion, `Версия должна быть больше ${yupConstants.minVersion} символа`)
		.max(yupConstants.maxVersion, `Версия должна быть меньше ${yupConstants.maxVersion} символа`),
})
