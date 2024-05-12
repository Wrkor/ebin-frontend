import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import Select from 'react-select'

const MSelect = forwardRef(({ control, name, options, onEdited, error, message, className, ...props }, _) => {
	const { field } = useController({ name, control })
	return (
		<>
			<Select
				{...props}
				ref={field.ref}
				value={
					Array.isArray(field?.value)
						? !!field?.value[0]?.value
							? field.value
							: ''
						: !!field?.value?.value
						? field.value
						: ''
				}
				onChange={option => {
					field.onChange(option)
					field.onBlur(option)
					onEdited && onEdited(option)
				}}
				onBlur={field.onBlur}
				options={options}
				classNamePrefix='react-select'
				className={`react-select ${className ?? ''}`}
				noOptionsMessage={() => 'Ничего не найдено'}
				loadingMessage={() => 'Идет поиск...'}
				placeholder='Выберите...'
			/>
			{error && <p className='error-msg'>{message}</p>}
		</>
	)
})

export default MSelect
