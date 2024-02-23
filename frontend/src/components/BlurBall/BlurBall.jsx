import React from 'react';
import './BlurBall.scss';
import classNames from "classnames";

const BlurBall = ({className, fullBlur, ...props}) => {

    return (
        <div className={classNames("BlurBall", !fullBlur||'full-blur', className)} {...props}>
            <div className="ball-container">
                <div className='ball' />
                <div className='ball-blur' />
            </div>
        </div>
    );
};

export default BlurBall;
