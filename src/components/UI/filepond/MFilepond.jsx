import React, { useState } from 'react'
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import "filepond/dist/filepond.min.css";
import './MFilepond.scss';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageEdit, FilePondPluginFileValidateType);

const MFilepond = ({changeValue, ...props}) => {
    const [value, setValue] = useState(props.default ?? []);

    const onChangeValue = (files) => {
        setValue(files);
        changeValue(files);
    };
    return (
        <FilePond
            {...props}
            className={`${props.className ?? ""}`}
            credits= ""
            name={props.name}
            files={value}
            allowMultiple={true}
            allowReorder={true}
            maxFiles={props.maxFiles}
            labelFileTypeNotAllowed="Неправильный формат файла"
            fileValidateTypeLabelExpectedTypes='Необходимо {allTypes}'
            acceptedFileTypes= {props.ext}
            labelIdle={props.placeholder}
            onupdatefiles={fileItems => onChangeValue(fileItems.map(fileItem => fileItem.file))}
        />
    );
};

export default MFilepond;
