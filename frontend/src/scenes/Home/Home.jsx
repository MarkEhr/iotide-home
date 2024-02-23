import React, {useContext, useEffect} from 'react';
import './Home.scss';
import {useSelector} from "react-redux";
import {ApiContext} from "../../services/api/api-config";
import DeviceCard from "./components/DeviceCard/DeviceCard";

const Home = () => {

    const api = useContext(ApiContext);

    const {me, devices} = useSelector(s => s.api);

    useEffect(() => {
        api.devices.get();
    }, [api]);

    return (
        <div className={"Home"}>
            <h1>Casa Anáhuac</h1>
            <p>Hola, {me.name}.</p>
            <div className={"devices-container"}>

                {devices?.map(device => <DeviceCard device={device} key={device.id+Math.random()}/>)}

            </div>
        </div>
    );
};

export default Home;
