import React, { useState } from 'react'
import AsyncSelect from 'react-select/async';

const MAsyncSelect = ({changeValue, request, ...props}) => {
    const defaultOption = {
        value: 'disabled', 
        label: 'Выберите...', 
        isDisabled: true, 
    }
    const [value, setValue] = useState(props.value?.label || defaultOption);
    
    const loadOptions = (inputValue) => new Promise((resolve) => {
            request()
                .then((options) => 
                {
                    resolve(options.objects?.filter((i) => 
                        i.name.toLowerCase().includes(inputValue.toLowerCase())
                    ).map(app => {return { name: app.id, label: app.name}}));
                })
        });
    
    const onChangeValue = (val) => { 
        changeValue(val);
        setValue(val);
    };

    return (
        <AsyncSelect cacheOptions loadOptions={loadOptions} {...props} defaultValue={value} onChange={onChangeValue} classNamePrefix="react-select" className={`react-select ${props.className ?? ""}`}/>
    );
};

export default MAsyncSelect;
