import React, { useState } from 'react'
import classes from './MInput.module.scss';

const MInput = ({changeValue, ...props}) => {
    const [value, setValue] = useState(props.default ?? '');

    const onChangeValue = (value) => { 
        setValue(value);
        changeValue(value);
    };
    return (
        <input value={value} onChange={e => onChangeValue(e.target.value)} {...props} className={`${classes.input} ${props.className || ""}`} type="text" placeholder={props.placeholder}/>
    );
};

export default MInput;
