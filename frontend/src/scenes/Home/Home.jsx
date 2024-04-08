import React, {useState, useContext, useEffect} from 'react';
import './Home.scss';
import {useSelector} from "react-redux";
import {ApiContext} from "../../services/api/api-config";
import DeviceCard from "./components/DeviceCard/DeviceCard";
import { io } from "socket.io-client";

const Home = () => {

    const api = useContext(ApiContext);

    const {me, devices} = useSelector(s => s.api);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        api.devices.get();

        const socket = io("http://localhost:4000", {
            path: "/ws-control/"
        });

        socket.on("connect", () => {
            console.log("Connected to ws server");
            socket.emit("auth",{"token": api.token})
        });

        setSocket(socket);
    }, [api]);

    return (
        <div className={"Home"}>
            <h1>Casa Anáhuac</h1>
            <p>Hola, {me.name}.</p>
            <div className={"devices-container"}>

                {devices?.map(device => <DeviceCard device={device} key={device.deviceId} socket={socket} />)}

            </div>
        </div>
    );
};

export default Home;
