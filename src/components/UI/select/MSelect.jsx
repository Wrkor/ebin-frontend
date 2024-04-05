import React, { useState } from 'react';
import Select from 'react-select';

const MSelect = ({changeValue, ...props}) => {
    const options = [
        {
            value: 'disabled', 
            label: 'Выберите...', 
            isDisabled: true, 
        }, 
        ...props.options
    ];
    const defaultValue = props.options.filter(option => option.value === props.default);
    const [value, setValue] = useState(defaultValue.length === 0 ? options[0] : defaultValue);
    
    const onChangeValue = (val) => { 
        setValue(val.value);
        changeValue(val.value);
    };
    

    return (
        <Select options={options} defaultValue={value} onChange={onChangeValue} {...props} classNamePrefix="react-select" className={`react-select ${props.className ?? ""}`}/>
    );
};

export default MSelect;
