import { yupResolver } from '@hookform/resolvers/yup'
import React, { useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
	MAppCard,
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
	TableBodyAppDelete,
	TableBodyUpdate,
	TableHeaderApp,
	TableHeaderUpdate,
	Title,
} from '../components/UI/'
import globalConstants from '../config/globalConstants'
import { appEditSchema } from '../config/validationSchema'
import useActions from '../hooks/useActions'
import { FindErrors } from '../utils/'
import Loading from './Loading'

const AppEdit = () => {
	const navigate = useNavigate()
	const urlID = useParams().id
	const tabAppRef = useRef()
	const tabInfoRef = useRef()
	const tabImagesRef = useRef()
	const tabAccessRef = useRef()
	const tabUpdatesRef = useRef()
	const { setAppEdit, getApp, postAppEdit, getCompanies } = useActions()

	const {
		register,
		control,
		getValues,
		trigger,
		setValue,
		setFocus,
		getFieldState,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: async () => {
			const app = await getApp({ id: urlID }).unwrap()
			const appCashed = await setAppEdit(app).unwrap()

			return {
				appChanged: {
					...appCashed.object,
				},
			}
		},
		mode: 'onTouched',
		resolver: yupResolver(appEditSchema),
	})

	const isIos = useWatch({ control, name: 'appChanged.isIos' })
	const isAndroid = useWatch({ control, name: 'appChanged.isAndroid' })
	const updates = useWatch({ control, name: 'appChanged.updates' })
	const id = useWatch({ control, name: 'appChanged.app.id' })
	const isCompanies = useWatch({ control, name: 'appChanged.access' })?.value === globalConstants.select.access[2].value

	async function onClickAppEditBtn() {
		const triggers = {
			'appChanged.name': tabAppRef?.current,
			...(isAndroid ? { 'appChanged.apk': tabAppRef?.current } : {}),
			...(isIos ? { 'appChanged.testFlight': tabAppRef?.current } : {}),
			...(isAndroid ? { 'appChanged.min_android': tabInfoRef?.current } : {}),
			...(isIos ? { 'appChanged.min_ios': tabInfoRef?.current } : {}),
			'appChanged.description': tabInfoRef?.current,
			'appChanged.icon': tabImagesRef?.current,
			'appChanged.images': tabImagesRef?.current,
			'appChanged.status': tabAccessRef?.current,
			'appChanged.access': tabAccessRef?.current,
			...(isCompanies ? { 'appChanged.companies': tabAccessRef?.current } : {}),
			'appChanged.updates': tabUpdatesRef?.current,
		}

		!isIos && clearErrors(['appChanged.min_ios', 'testFlight'])
		!isAndroid && clearErrors(['appChanged.min_android', 'appChanged.apk'])
		!isCompanies && clearErrors(['companies'])

		if (await FindErrors(getFieldState, setFocus, trigger, triggers)) return

		const appChanged = getValues('appChanged')

		const app = {
			id: appChanged.app.id,
			name: appChanged.name,
			description: appChanged.description,
			version: appChanged?.app?.release?.version || '',
			minAndroid: isAndroid ? appChanged?.min_android : '',
			minIos: isIos ? appChanged?.min_ios : '',
			testFlight: isIos ? appChanged?.testFlight : '',
			status: appChanged?.status?.value,
			access: appChanged?.access?.value,
			companies: isCompanies ? appChanged.companies.map(company => company.name).join(',') : '',
			apkFile: isAndroid && appChanged.apk.length > 0 ? appChanged.apk[0] : '',
			iconFile: appChanged.icon.length > 0 ? appChanged.icon[0] : '',
			imagesFiles: appChanged.images.length > 0 ? appChanged.images : '',
			developer: appChanged?.app?.developer,
			updates: appChanged?.updates.map(update => {
				return (update = {
					id: update.id,
					appId: update.appId,
					version: update.version,
					testFlight: update.testFlight,
					description: update.description,
				})
			}),
		}

		postAppEdit(app).then(({ meta }) => {
			if (meta?.requestStatus === 'fulfilled') {
				navigate(globalConstants.routes.app.replace(':id', urlID))
			}
		})
	}

	const onClickSortUpdatesBtn = (key, SortBy, isEnc) =>
		key && SortBy && setValue('appChanged.updates', SortBy(updates, key, isEnc))

	return id ? (
		<div>
			<Title title='Редактирование' subtitle='Редактируйте карточку приложения в маркете' />
			<nav>
				<div className='nav nav-tabs' id='nav-tab' role='tablist'>
					<TabOption ref={tabAppRef} name='Приложение' id='app' active='true' />
					<TabOption ref={tabInfoRef} name='О приложении' id='info' />
					<TabOption ref={tabImagesRef} name='Графика' id='images' />
					<TabOption ref={tabAccessRef} name='Доступ' id='access' />
					<TabOption ref={tabUpdatesRef} name='История обновлений' id='updates' />
					<TabOption name='Карточка приложения' id='app-card' />
					<TabOption name='Удаление приложения' id='app-delete' />
				</div>
			</nav>
			<div className='tab-content mt-4' id='nav-tabContent'>
				<TabContent id='app' active='true'>
					<MForm title='Название' subtitle='Изменить название приложения'>
						<MInput
							{...register('appChanged.name')}
							error={!!errors?.appChanged?.name}
							message={errors?.appChanged?.name?.message}
							className='ui-size-xl'
							placeholder='Название'
						/>
					</MForm>
					<MForm className='mb-4' title='Платформа' subtitle='Выберите платформы под которые выпускается приложение'>
						<MCheckbox {...register('appChanged.isAndroid')} className='ui-size-xl' text='Android' />
						<MCheckbox {...register('appChanged.isIos')} className='ui-size-xl' text='IOS' />
					</MForm>
					{isAndroid && (
						<MForm className='mb-4' title='Файл' subtitle='Изменить приложение для Android'>
							<MFilepond
								name='appChanged.apk'
								control={control}
								error={!!errors?.appChanged?.apk}
								message={errors?.appChanged?.apk?.message}
								maxFiles={1}
								ext={globalConstants.ext.android}
								className='ui-size-xl'
								placeholder='Нажмите или перетащите файл apk...'
							/>
						</MForm>
					)}
					{isIos && (
						<MForm title='TestFlight' subtitle='Изменить ссылку на приложение ios в TestFlight'>
							<MInput
								{...register('appChanged.testFlight')}
								error={!!errors?.appChanged?.testFlight}
								message={errors?.appChanged?.testFlight?.message}
								className='ui-size-xl'
								placeholder='https://'
							/>
						</MForm>
					)}
				</TabContent>

				<TabContent id='info'>
					{isAndroid && (
						<MForm title='Требование версии Android' subtitle='Напишите минимальную версию Android'>
							<MInput
								{...register('appChanged.min_android')}
								error={!!errors?.appChanged?.min_android}
								message={errors?.appChanged?.min_android?.message}
								className='ui-size-s'
								placeholder='14.0'
							/>
						</MForm>
					)}
					{isIos && (
						<MForm title='Требование версии IOS' subtitle='Напишите минимальную версию IOS'>
							<MInput
								{...register('appChanged.min_ios')}
								error={!!errors?.appChanged?.min_ios}
								message={errors?.appChanged?.min_ios?.message}
								className='ui-size-s'
								placeholder='5.0'
							/>
						</MForm>
					)}
					<MForm title='Описание приложения' subtitle='Напишите полное описание приложения'>
						<MTextarea
							{...register('appChanged.description')}
							error={!!errors?.appChanged?.description}
							message={errors?.appChanged?.description?.message}
							className='ui-size-xl'
							placeholder='Приложение - средство для...'
						/>
					</MForm>
				</TabContent>

				<TabContent id='images'>
					<MForm className='mb-4' title='Значок приложения' subtitle='Загрузите значок приложения'>
						<MFilepond
							name='appChanged.icon'
							control={control}
							error={!!errors?.appChanged?.icon}
							message={errors?.appChanged?.icon?.message}
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
							name='appChanged.images'
							control={control}
							error={!!errors?.appChanged?.images}
							message={errors?.appChanged?.images?.message}
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
							{...register('appChanged.status')}
							control={control}
							error={!!errors?.appChanged?.status?.value}
							message={errors?.appChanged?.status?.value?.message}
							options={globalConstants.select.status}
							className='ui-size-m'
						/>
					</MForm>
					<MForm className='mb-4' title='Доступ к приложению' subtitle='Выберите уровень доступа к приложению'>
						<MSelect
							{...register('appChanged.access')}
							control={control}
							error={!!errors?.appChanged?.access?.value}
							message={errors?.appChanged?.access?.value?.message}
							options={globalConstants.select.access}
							className='ui-size-m'
						/>
					</MForm>
					{isCompanies && (
						<MForm title='Компании' subtitle='Выберите компании доступным приложение'>
							<MAsyncSelect
								{...register('appChanged.companies')}
								control={control}
								error={!!errors?.appChanged?.companies}
								message={errors?.appChanged?.companies?.message}
								request={getCompanies}
								className='ui-size-xl'
								isMulti={true}
							/>
						</MForm>
					)}
				</TabContent>

				<TabContent id='updates'>
					<MForm className='mb-4' title='История обновлений' subtitle='Редактируйте обновления'>
						<table className='table'>
							<thead>
								<TableHeaderUpdate onClickSortBtn={onClickSortUpdatesBtn} />
							</thead>
							<tbody>
								{updates?.length > 0 &&
									updates.map((update, index) => (
										<TableBodyUpdate
											key={index}
											register={register}
											index={index}
											update={update}
											errors={errors}
											onEdited={value =>
												setValue(
													'appChanged.updates',
													updates.map(update => (update.id === value.id ? value : update))
												)
											}
											deleteUpdate={id =>
												setValue(
													'appChanged.updates',
													updates.filter(update => update.id !== id)
												)
											}
										/>
									))}
							</tbody>
						</table>
					</MForm>
				</TabContent>

				<TabContent id='app-card'>
					<MAppCard app={getValues('appChanged.app')} />
				</TabContent>

				<TabContent id='app-delete'>
					<MForm
						className='mb-4'
						title='Удаление приложения'
						subtitle='Приложение будет удалено из маркета навсегда и безвозвратно'
					>
						<table className='table'>
							<thead>
								<TableHeaderApp />
							</thead>
							<tbody>
								<TableBodyAppDelete app={getValues('appChanged.app')} />
							</tbody>
						</table>
					</MForm>
				</TabContent>
			</div>
			<MFooter>
				<h6 className='cancel' onClick={() => navigate(-1)}>
					Вернуться без сохранения
				</h6>
				<MButton className='ui-size-s' name='Сохранить изменения' onClick={onClickAppEditBtn} active='true' />
			</MFooter>
		</div>
	) : (
		<Loading />
	)
}

export default AppEdit
