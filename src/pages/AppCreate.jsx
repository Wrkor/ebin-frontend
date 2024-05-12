import { yupResolver } from '@hookform/resolvers/yup'
import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.js'
import React, { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	MAsyncSelect,
	MButton,
	MCheckbox,
	MFilepond,
	MFooter,
	MForm,
	MInput,
	MSelect,
	MTextarea,
	TabContent,
	TabOption,
	Title,
} from '../components/UI/'
import globalConstants from '../config/globalConstants'
import { appCreateSchema } from '../config/validationSchema'
import { useActions } from '../hooks/'
import '../styles/AppCreate.scss'
import { FindErrors } from '../utils/'

const AppCreate = () => {
	const appCreate = useSelector(state => state.app.appCreate)
	const navigate = useNavigate()
	const tabAppRef = useRef()
	const tabInfoRef = useRef()
	const tabImagesRef = useRef()
	const tabAccessRef = useRef()
	const { postAppCreate, setAppCreate, changeAppCreate, getCompanies } = useActions()
	const [isNextTab, SetIsNextTab] = useState(true)

	const {
		register,
		reset,
		control,
		getValues,
		trigger,
		setFocus,
		clearErrors,
		getFieldState,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: appCreate.name || '',
			description: appCreate.description || '',
			version: appCreate.version || '',
			isAndroid: appCreate.isAndroid ?? true,
			isIos: appCreate.isIos ?? true,
			min_android: appCreate.min_android || '',
			min_ios: appCreate.min_ios || '',
			testFlight: appCreate.testFlight || '',
			status: appCreate.status || {},
			access: appCreate.access || {},
			companies: appCreate.companies || [],
			apkFile: [],
			iconFile: [],
			imagesFiles: [],
		},
		mode: 'onTouched',
		resolver: yupResolver(appCreateSchema),
	})

	const isIos = useWatch({ control, name: 'isIos' })
	const isAndroid = useWatch({ control, name: 'isAndroid' })
	const isCompanies = useWatch({ control, name: 'access' })?.value === globalConstants.select.access[2].value

	async function onClickAppCreate() {
		const triggers = {
			name: tabAppRef?.current,
			...(isAndroid ? { apkFile: tabAppRef?.current } : {}),
			...(isIos ? { testFlight: tabAppRef?.current } : {}),
			version: tabInfoRef?.current,
			...(isAndroid ? { min_android: tabInfoRef?.current } : {}),
			...(isIos ? { min_ios: tabInfoRef?.current } : {}),
			description: tabInfoRef?.current,
			iconFile: tabImagesRef?.current,
			imagesFiles: tabImagesRef?.current,
			status: tabAccessRef?.current,
			access: tabAccessRef?.current,
			...(isCompanies ? { companies: tabAccessRef?.current } : {}),
		}
		!isIos && clearErrors(['min_ios', 'testFlight'])
		!isAndroid && clearErrors(['min_android', 'apkFile'])
		!isCompanies && clearErrors(['companies'])

		if (await FindErrors(getFieldState, setFocus, trigger, triggers)) return

		const iconFile = getValues('iconFile')
		const apkFile = getValues('apkFile')
		const imagesFiles = getValues('imagesFiles')
		const companies = getValues('companies')

		const app = {
			name: getValues('name'),
			description: getValues('description'),
			version: getValues('version'),
			minAndroid: isAndroid ? getValues('min_android') : '',
			minIos: isIos ? getValues('min_ios') : '',
			testFlight: isIos ? getValues('testFlight') : '',
			status: getValues('status.value'),
			access: getValues('access.value'),
			companies: isCompanies ? companies.map(company => company.name).join(',') : '',
			apkFile: isAndroid && apkFile.length > 0 ? apkFile[0] : '',
			iconFile: iconFile.length > 0 ? iconFile[0] : '',
			imagesFiles: imagesFiles.length > 0 ? imagesFiles : '',
			developer: 'En+ Digital',
		}

		postAppCreate(app).then(({ meta }) => {
			if (meta?.requestStatus === 'fulfilled') {
				onResetData()
				navigate(globalConstants.routes.apps)
			}
		})
	}

	const onResetData = () => {
		setAppCreate({})
		reset({
			name: '',
			description: '',
			version: '',
			isAndroid: true,
			isIos: true,
			min_android: '',
			min_ios: '',
			testFlight: '',
			status: {},
			access: {},
			companies: [],
			apkFile: [],
			iconFile: [],
			imagesFiles: [],
		})
	}

	useEffect(() => {
		const tabAppCard = tabAccessRef?.current
		const tabImages = tabImagesRef?.current
		const tabInfo = tabInfoRef?.current
		const tabApp = tabAppRef?.current

		const nextFalse = () => SetIsNextTab(false)
		const nextAccess = () => SetIsNextTab(tabAppCard)
		const nextImages = () => SetIsNextTab(tabImages)
		const nextInfo = () => SetIsNextTab(tabInfo)

		tabAppCard?.addEventListener('show.bs.tab', nextFalse)
		tabImages?.addEventListener('show.bs.tab', nextAccess)
		tabInfo?.addEventListener('show.bs.tab', nextImages)
		tabApp?.addEventListener('show.bs.tab', nextInfo)

		SetIsNextTab(tabInfo)

		return () => {
			tabAppCard?.removeEventListener('show.bs.tab', nextFalse)
			tabImages?.removeEventListener('show.bs.tab', nextAccess)
			tabInfo?.removeEventListener('show.bs.tab', nextImages)
			tabApp?.removeEventListener('show.bs.tab', nextInfo)
		}
	}, [tabAccessRef, tabImagesRef, tabInfoRef, tabAppRef])

	return (
		<div>
			<Title title='Публикация' subtitle='Опишите и загрузите новое приложение в маркет' />
			<nav>
				<div className='nav nav-tabs' id='nav-tab' role='tablist'>
					<TabOption ref={tabAppRef} name='Приложение' id='app' active='true' />
					<TabOption ref={tabInfoRef} name='О приложении' id='info' />
					<TabOption ref={tabImagesRef} name='Графика' id='images' />
					<TabOption ref={tabAccessRef} name='Доступ' id='access' />
				</div>
			</nav>
			<div className='tab-content mt-4' id='nav-tabContent'>
				<TabContent id='app' active='true'>
					<MForm title='Название' subtitle='Напишите название приложения'>
						<MInput
							{...register('name')}
							error={!!errors?.name}
							message={errors?.name?.message}
							onEdited={name => changeAppCreate({ name })}
							className='ui-size-xl'
							placeholder='Название'
						/>
					</MForm>
					<MForm className='mb-4' title='Платформа' subtitle='Выберите платформы под которые выпускается приложение'>
						<MCheckbox
							{...register('isAndroid')}
							onEdited={isAndroid => changeAppCreate({ isAndroid })}
							className='ui-size-xl'
							text='Android'
						/>
						<MCheckbox
							{...register('isIos')}
							onEdited={isIos => changeAppCreate({ isIos })}
							className='ui-size-xl'
							text='IOS'
						/>
					</MForm>
					{isAndroid && (
						<MForm className='mb-4' title='Файл' subtitle='Загрузите приложение с новой версией для Android'>
							<MFilepond
								name={'apkFile'}
								control={control}
								error={!!errors?.apkFile}
								message={errors?.apkFile?.message}
								maxFiles={1}
								ext={globalConstants.ext.android}
								className='ui-size-xl'
								placeholder='Нажмите или перетащите файл apk...'
							/>
						</MForm>
					)}
					{isIos && (
						<MForm title='TestFlight' subtitle='Вставьте ссылку на приложение ios в TestFlight'>
							<MInput
								{...register('testFlight')}
								error={!!errors?.testFlight}
								message={errors?.testFlight?.message}
								onEdited={testFlight => changeAppCreate({ testFlight })}
								className='ui-size-xl'
								placeholder='https://'
							/>
						</MForm>
					)}
				</TabContent>

				<TabContent id='info'>
					<MForm title='Версия' subtitle='Напишите версию'>
						<MInput
							{...register('version')}
							error={!!errors?.version}
							message={errors?.version?.message}
							onEdited={version => changeAppCreate({ version })}
							className='ui-size-s'
							placeholder='1.0.1'
						/>
					</MForm>
					{isAndroid && (
						<MForm title='Требование версии Android' subtitle='Напишите минимальную версию Android'>
							<MInput
								{...register('min_android')}
								error={!!errors?.min_android}
								message={errors?.min_android?.message}
								onEdited={min_android => changeAppCreate({ min_android })}
								className='ui-size-s'
								placeholder='14.0'
							/>
						</MForm>
					)}
					{isIos && (
						<MForm title='Требование версии IOS' subtitle='Напишите минимальную версию IOS'>
							<MInput
								{...register('min_ios')}
								error={!!errors?.min_ios}
								message={errors?.min_ios?.message}
								onEdited={min_ios => changeAppCreate({ min_ios })}
								className='ui-size-s'
								placeholder='5.0'
							/>
						</MForm>
					)}
					<MForm title='Описание приложения' subtitle='Напишите полное описание приложения'>
						<MTextarea
							{...register('description')}
							error={!!errors?.description}
							message={errors?.description?.message}
							onEdited={description => changeAppCreate({ description })}
							className='ui-size-xl'
							placeholder='Приложение - средство для...'
						/>
					</MForm>
				</TabContent>

				<TabContent id='images'>
					<MForm className='mb-4' title='Значок приложения' subtitle='Загрузите значок приложения'>
						<MFilepond
							name={'iconFile'}
							control={control}
							error={!!errors?.iconFile}
							message={errors?.iconFile?.message}
							maxFiles={1}
							ext={globalConstants.ext.images}
							className='ui-size-xl'
							placeholder='Нажмите или перетащите изображениe...'
						/>
					</MForm>
					<MForm
						className='mb-4'
						title='Фотографии'
						subtitle='Загрузите фотографии для ознакомления с работой приложения'
					>
						<MFilepond
							name={'imagesFiles'}
							control={control}
							error={!!errors?.imagesFiles}
							message={errors?.imagesFiles?.message}
							maxFiles={10}
							ext={globalConstants.ext.images}
							className='ui-size-xl'
							placeholder='Нажмите или перетащите изображения...'
						/>
					</MForm>
				</TabContent>

				<TabContent id='access'>
					<MForm className='mb-4' title='Статус приложения' subtitle='Выберите статус версии приложения в маркете'>
						<MSelect
							{...register('status')}
							control={control}
							error={!!errors?.status?.value}
							message={errors?.status?.value?.message}
							onEdited={status => changeAppCreate({ status })}
							options={globalConstants.select.status}
							className='ui-size-m'
						/>
					</MForm>
					<MForm className='mb-4' title='Доступ к приложению' subtitle='Выберите уровень доступа к приложению'>
						<MSelect
							{...register('access')}
							control={control}
							error={!!errors?.access?.value}
							message={errors?.access?.value?.message}
							onEdited={access => changeAppCreate({ access })}
							options={globalConstants.select.access}
							className='ui-size-m'
						/>
					</MForm>
					{isCompanies && (
						<MForm title='Компании' subtitle='Выберите компании доступным приложение'>
							<MAsyncSelect
								{...register('companies')}
								control={control}
								error={!!errors?.companies}
								message={errors?.companies?.message}
								onEdited={companies => changeAppCreate({ companies })}
								request={getCompanies}
								className='ui-size-xl'
								isMulti={true}
							/>
						</MForm>
					)}
				</TabContent>
			</div>
			<MFooter>
				<h6 className='cancel' onClick={onResetData}>
					Сбросить
				</h6>
				{isNextTab ? (
					<MButton name='Далее' onClick={() => new Tab(isNextTab)?.show()} className='ui-size-xs' />
				) : (
					<MButton name='Опубликовать' onClick={onClickAppCreate} active='true' className='ui-size-xs' />
				)}
			</MFooter>
		</div>
	)
}

export default AppCreate
