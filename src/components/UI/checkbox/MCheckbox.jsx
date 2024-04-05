import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import classes from './MCheckbox.module.scss';

const MCheckbox = ({changeValue, ...props}) => {
    const [value, setValue] = useState(props.default ?? false);
    const isBlackTheme = useSelector(state => state.constants.isBlackTheme);
    const onChangeValue = () => { 
        setValue(!value);
        changeValue(!value);
    };

    return (
        <div className={`${classes.check} d-flex mb-3 align-items-center ${props.className ?? ""}`}>
            <label className={`${classes.check} ${isBlackTheme ? classes.black : ""}`}>
                <input value={value} onChange={onChangeValue} {...props} checked={props.default ?? false} className = "" type="checkbox"/>
            </label>
            <h6 className='ms-2'>{props.name}</h6>
        </div>
    );
};

export default MCheckbox;
