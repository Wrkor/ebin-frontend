import React from 'react';
import classes from './MButton.module.scss';

const MButton = ({...props}) => {
    return (
        <button {...props} className={`${classes.button} ${props.active ? classes.active : ''} ${props.className ?? ''}`}>{props.name}</button>
    );
};

export default MButton;
