import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

const MAsyncSelect = forwardRef(
	({ control, name, request, options, onEdited, error, message, className, ...props }, _) => {
		const { field } = useController({ name, control })
		const loadOptions = input =>
			new Promise((resolve, reject) => {
				request().then(({ payload, meta }) => {
					if (meta?.requestStatus === 'fulfilled') {
						resolve(
							payload.objects
								?.filter(i => i.name.toLowerCase().includes(input.toLowerCase()))
								.map(app => {
									return { name: app.id, label: app.name }
								})
						)
					} else reject()
				})
			})
		return (
			<>
				<AsyncSelect
					{...props}
					ref={field.ref}
					value={
						Array.isArray(field?.value)
							? !!field?.value[0]?.name
								? field.value
								: ''
							: !!field?.value?.name
							? field.value
							: ''
					}
					loadOptions={loadOptions}
					onChange={option => {
						field.onChange(option)
						onEdited && onEdited(option)
					}}
					onBlur={field.onBlur}
					defaultOptions
					cacheOptions
					classNamePrefix='react-select'
					className={`react-select ${className ?? ''}`}
					noOptionsMessage={() => 'Ничего не найдено'}
					loadingMessage={() => 'Идет поиск...'}
					placeholder='Выберите...'
				/>
				{error && <p className='error-msg'>{message}</p>}
			</>
		)
	}
)

export default MAsyncSelect
