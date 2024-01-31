import React from 'react';
import classes from './MButton.module.scss';
import Button from 'react-bootstrap/Button';

const MButton = ({children, ...props}) => {
    return (
        <Button variant="primary" {...props} className={classes.MBtn}>
            {children}
        </Button>
    );
};

export default MButton;
