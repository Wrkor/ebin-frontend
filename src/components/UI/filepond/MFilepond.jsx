import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { useController } from 'react-hook-form'

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginImageEdit,
	FilePondPluginFileValidateType
)

const MFilepond = ({ control, name, maxFiles, ext, placeholder, onEdited, error, message, ...props }) => {
	const { field } = useController({ name, control })

	const onUpdateFiles = fileItems => {
		const files = fileItems
			.map(fileItem => {
				fileItem?.abortProcessing()
				return fileItem.file
			})
			.filter(file => !!file && (file instanceof Blob || file instanceof File))

		if (files.length > 0 || fileItems.length === 0) {
			field.onChange(files)
			field.onBlur(files)
			onEdited && onEdited(files)
		}
	}
	return (
		<>
			<FilePond
				{...props}
				ref={field.ref}
				files={field.value}
				name={field.name}
				allowMultiple={true}
				allowReorder={true}
				allowImageEdit={true}
				forceRevert={true}
				allowImageExifOrientation={true}
				allowImagePreview={true}
				maxFiles={!!maxFiles ? maxFiles : 1}
				acceptedFileTypes={ext}
				onupdatefiles={onUpdateFiles}
				labelIdle={placeholder}
				fileValidateTypeLabelExpectedTypes='Необходимо {allTypes}'
				labelFileTypeNotAllowed='Неправильный формат файла'
				labelFileProcessingAborted='Файл загружен'
				labelTapToRetry='Нажмите X чтобы удалить'
				credits=''
			/>
			{error && <p className='error-msg'>{message}</p>}
		</>
	)
}

export default MFilepond
