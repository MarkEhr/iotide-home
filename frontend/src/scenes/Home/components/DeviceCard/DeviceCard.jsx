import React, {useContext, useState, useEffect} from 'react';
import './DeviceCard.scss';
import classNames from "classnames";
import {ApiContext} from "../../../../services/api/api-config";

const DeviceCard = ({ device, socket }) => {

    const api = useContext(ApiContext);

    const getPercentage = ( actual )=>{
        if(device.type !== 'waterv1' || !actual)
            return 0;

        const range = device.config.maxValue - device.config.minValue;
        return Math.round((actual - device.config.minValue) * 100 / range);
    }

    const [running, setRunning] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [percentage, setPercentage] = useState(getPercentage( device?.state?.humidity ));

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

    const handleUpdateClick = ()=>{
        api.devices.command({ method: 'POST', params: { deviceId: device.deviceId, command:'{"update":"firmware.bin"}' }, customProp: 'command' })
            .catch(console.error);
        setTimeout(()=>setRunning(false), 5000);
        setRunning(!running);
    }

    const handleStreamClick = ()=>{
        if (socket) {
            if(streaming) {
                socket.emit('stream', { deviceId: device.deviceId });
            } else {
                socket.emit('stream', { deviceId: device.deviceId });
            }
            setStreaming(streaming=>!streaming);
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('message',  (data) => {
                if(data.deviceId !== device.deviceId)
                    return;
                setPercentage(data.message.humidity);
            });
        }
        return () => {
            if (socket) {
                socket.off('message');
            }
        };
    }, [socket, device.deviceId]);

    return (
        <div className={"DeviceCard"}>
            <p className='name'>
                {device.name}
            </p>

            <div className='type-widget'>
                {device.type === 'waterv1'&&
                <div className='water-meter'>
                    <p className='percentage'>{percentage}%</p>
                    <div className='water-bar' style={{ height: `${percentage}%` }}/>
                </div>}

                <div className='circ-container' onClick={handleClick}>
                    <div className={classNames('status-circle', getCircleClass())} />
                    <p className='button-label'>Send ON</p>
                </div>
                <div className='circ-container' onClick={handleUpdateClick}>
                    <div className={classNames('status-circle', getCircleClass())} />
                    <p className='button-label'>Update</p>
                </div>
                <div className='circ-container' onClick={handleStreamClick}>
                    <div className={classNames('status-circle', getCircleClass())} />
                    <p className='button-label'>Stream</p>
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;
