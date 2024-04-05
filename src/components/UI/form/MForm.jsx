import React from 'react'
import classes from './MForm.module.scss';

const MForm = ({children, ...props}) => {
    return (
        <div {...props} className={`${classes.form} ${props.className ?? ""}`}>
            <h5 className={`${classes.title} mb-3`}>{props.title}</h5>
            <h6 className={`${classes.subtitle} mt-1 mb-3`}>{props.subtitle}</h6>
            {children}
            <h6 className={`${classes.validate} mt-3 ${!props.validate?.length && "d-none"}`}>0/{props.validate?.length}</h6>
        </div>
    );
};

export default MForm;
