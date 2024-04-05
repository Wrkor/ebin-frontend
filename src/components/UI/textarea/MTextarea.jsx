import React, { useState } from 'react'
import classes from './MTextarea.module.scss';

const MTextarea = ({changeValue, ...props}) => {
    const [value, setValue] = useState(props.default ?? '');

    const onChangeValue = (value) => { 
        setValue(value);
        changeValue(value);
    };
    return (
        <textarea value={value} onChange={e => onChangeValue(e.target.value)} {...props} className={`${classes.input} ${props.className ?? ""}`} type="text" placeholder={props.placeholder}/>
    );
};

export default MTextarea;
