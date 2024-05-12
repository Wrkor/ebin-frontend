import { yupResolver } from '@hookform/resolvers/yup'
import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.js'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	MAppCard,
	MAsyncSelect,
	MButton,
	MFilepond,
	MFooter,
	MForm,
	MInput,
	MTextarea,
	TabContent,
	TabOption,
	Title,
} from '../components/UI'
import globalConstants from '../config/globalConstants'
import { updateCreateSchema } from '../config/validationSchema'
import useActions from '../hooks/useActions'
import '../styles/AppUpdate.scss'
import { FindErrors } from '../utils/'

const AppUpdate = () => {
	const updateCreate = useSelector(state => state.app.updateCreate)
	const navigate = useNavigate()
	const tabAppRef = useRef()
	const tabInfoRef = useRef()
	const tabAppCardRef = useRef()
	const { postUpdateCreate, getApp, getAppsId, setUpdateCreate, changeUpdateCreate, clearUpdateCreate } = useActions()
	const [isNextTab, SetIsNextTab] = useState(true)

	const {
		register,
		setValue,
		reset,
		getValues,
		trigger,
		setFocus,
		getFieldState,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			version: updateCreate.version ?? '',
			app: updateCreate.app ?? {},
			select: updateCreate.select ?? {},
			description: updateCreate.description ?? '',
			testFlight: updateCreate.testFlight ?? '',
			apkFile: [],
		},
		mode: 'onTouched',
		resolver: yupResolver(updateCreateSchema),
	})

	async function onClickUpdateCreate() {
		const triggers = {
			select: tabAppRef?.current,
			...(updateCreate?.app?.lastUpdate?.filePath ? { apkFile: tabAppRef?.current } : {}),
			...(updateCreate?.app?.lastUpdate?.testFlight ? { testFlight: tabAppRef?.current } : {}),
			version: tabInfoRef?.current,
			description: tabInfoRef?.current,
		}

		if (await FindErrors(getFieldState, setFocus, trigger, triggers)) return

		const apkFile = getValues('apkFile')

		const update = {
			appId: getValues('select.name'),
			apkFile: updateCreate?.app?.lastUpdate?.filePath && apkFile.length > 0 ? apkFile[0] : '',
			testFlight: updateCreate?.app?.lastUpdate?.testFlight ? getValues('testFlight') : '',
			version: getValues('version'),
			description: getValues('description'),
		}

		postUpdateCreate(update).then(({ meta }) => {
			if (meta?.requestStatus === 'fulfilled') {
				onResetData()
				navigate(globalConstants.routes.app.replace(':id', updateCreate?.app?.id))
			}
		})
	}

	const onResetData = () => {
		clearUpdateCreate()
		reset({
			version: '',
			app: {},
			select: {},
			description: '',
			testFlight: '',
			apkFile: [],
		})
	}

	useEffect(() => {
		!!updateCreate?.select?.name &&
			getApp({ id: updateCreate.select.name }).then(
				({ payload, meta }) =>
					meta?.requestStatus === 'fulfilled' &&
					setUpdateCreate(payload).then(({ payload, meta }) => {
						if (meta?.requestStatus === 'fulfilled') {
							//TODO
							setValue('testFlight', payload.object.testFlight)
							trigger('select.name')
							trigger('testFlight')
						}
					})
			)
	}, [getApp, setUpdateCreate, trigger, setValue, updateCreate?.select?.name])

	useEffect(() => {
		const tabAppCard = tabAppCardRef?.current
		const tabInfo = tabInfoRef?.current
		const tabApp = tabAppRef?.current

		const nextFalse = () => SetIsNextTab(false)
		const nextInfo = () => SetIsNextTab(tabInfo)

		tabAppCard?.addEventListener('show.bs.tab', nextFalse)
		tabInfo?.addEventListener('show.bs.tab', nextFalse)
		tabApp?.addEventListener('show.bs.tab', nextInfo)

		SetIsNextTab(tabInfo)

		return () => {
			tabAppCard?.removeEventListener('show.bs.tab', nextFalse)
			tabInfo?.removeEventListener('show.bs.tab', nextFalse)
			tabApp?.removeEventListener('show.bs.tab', nextInfo)
		}
	}, [tabAppRef, tabInfoRef, tabAppCardRef])

	return (
		<div>
			<Title title='Обновление' subtitle='Опишите новвоведение и обновите приложение в маркете' />
			<nav>
				<div className='nav nav-tabs' id='nav-tab' role='tablist'>
					<TabOption ref={tabAppRef} name='Приложение' id='app' active='true' />
					<TabOption ref={tabInfoRef} name='О приложении' id='info' />
					<TabOption ref={tabAppCardRef} name='Карточка приложения' id='app-card' />
				</div>
			</nav>
			<div className='tab-content mt-4' id='nav-tabContent'>
				<TabContent id='app' active='true'>
					<MForm className='mb-4' title='Приложение' subtitle='Выберите имеющееся приложение из маркета'>
						<MAsyncSelect
							{...register('select')}
							control={control}
							error={!!errors?.select?.name}
							message={errors?.select?.name?.message}
							onEdited={select => changeUpdateCreate({ select })}
							request={getAppsId}
							className='ui-size-xl'
						/>
					</MForm>
					{updateCreate?.app?.id && (
						<>
							{updateCreate?.app?.lastUpdate?.filePath && (
								<MForm className='mb-4' title='Файл' subtitle='Загрузить приложение с новой версией для Android'>
									<MFilepond
										name='apkFile'
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
							{updateCreate?.app?.lastUpdate?.testFlight && (
								<MForm title='TestFlight' subtitle='Изменить ссылку на приложение ios в TestFlight'>
									<MInput
										{...register('testFlight')}
										error={!!errors?.testFlight}
										message={errors?.testFlight?.message}
										onEdited={testFlight => changeUpdateCreate({ testFlight })}
										className='ui-size-xl'
										placeholder='https://'
									/>
								</MForm>
							)}
						</>
					)}
				</TabContent>
				<TabContent id='info'>
					<MForm title='Новая версия' subtitle='Напишите новую версию'>
						<MInput
							{...register('version')}
							error={!!errors?.version}
							message={errors?.version?.message}
							onEdited={version => changeUpdateCreate({ version })}
							className='ui-size-s'
							placeholder='1.1.1'
						/>
					</MForm>
					<MForm title='Информация об обновлении' subtitle='Напишите внесенные изменения в приложение'>
						<MTextarea
							{...register('description')}
							error={!!errors?.description}
							message={errors?.description?.message}
							onEdited={description => changeUpdateCreate({ description })}
							className='ui-size-xl'
							placeholder='Добавлено...&#10;Обновлено...'
						/>
					</MForm>
				</TabContent>
				<TabContent id='app-card'>
					{updateCreate?.app?.id ? (
						<MAppCard app={updateCreate.app} />
					) : (
						<div className='choiceApp w-100 d-flex justify-content-center mt-4'>
							<h5>Выберите приложение</h5>
						</div>
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
					<MButton active='true' name='Выпустить обновление' onClick={onClickUpdateCreate} className='ui-size-s' />
				)}
			</MFooter>
		</div>
	)
}

export default AppUpdate
