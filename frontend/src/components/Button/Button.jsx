import React from 'react';
import './Button.scss';
import classNames from "classnames";

const Button = ({ children, className, ...props }) => {

    return (
        <button className={classNames("Button", className)} {...props}>
            {children}
        </button>
    );
};

export default Button;
