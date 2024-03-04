import React, {useContext, useState} from 'react';
import './DeviceCard.scss';
import classNames from "classnames";
import {ApiContext} from "../../../../services/api/api-config";

const DeviceCard = ({ device }) => {

    const api = useContext(ApiContext);

    const [running, setRunning] = useState(false);

    const getCircleClass = ()=>{
        if(running)
            return 'running';
        return device.isConnected? 'online' : 'offline';
    }

    const handleClick = ()=>{
        api.devices.command({ method: 'POST', params: { deviceId: device.deviceId, command:'ON' }, customProp: 'command' })
            .catch(console.error);
        setTimeout(()=>setRunning(false), 5000);
        setRunning(!running);
    }

    return (
        <div className={"DeviceCard"} onClick={handleClick}>
            <p className='name'>
                {device.name}
            </p>

            <div className='type-widget'>
                {device.type === 'waterv1'&&
                <div className='water-meter'>
                    <p className='percentage'>78%</p>
                    <div className={'water-bar'}/>
                </div>}

                <div className='circ-container'>
                    <div className={classNames('status-circle', getCircleClass())} />
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;
