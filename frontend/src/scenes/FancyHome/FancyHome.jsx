import React, {useState} from 'react';
import './FancyHome.scss';
import { Breadcrumb, Layout, Avatar, Typography, Badge} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Sidebar from "./components/Sidebar/Sidebar";
import {Navigate, Route, Routes} from "react-router-dom";
import getAppRoutes from "../../services/routes/appRoutes";

const { Header, Content} = Layout;
const { Text } = Typography;

const FancyHome = () => {

    const [badgeCount, setBadgeCount] = useState(3);

    const handleAvatarClick = () => {
        setBadgeCount(badgeCount + 1);
    }

    const routes = getAppRoutes();

    return (
            <Layout className={"FancyHome"}>
                <Header className={"header"}>
                    <div className={"header-container"}>
                        <img src={"/logo.png"} alt="Logo" style={{height: "80%"}}/>
                        <Text style={{fontSize: '4.5vmin'}}>IoTide Home</Text>
                    </div>
                    <div className={"header-container"}>
                        <Text style={{fontSize: '2.5vmin'}}>M Ehrlich</Text>
                        <Badge count={badgeCount}>
                            <Avatar icon={<UserOutlined />} onClick={handleAvatarClick}/>
                        </Badge>
                    </div>
                </Header>
                <Layout>
                    <Sidebar />
                    <Layout>
                        <Breadcrumb className={"breadcrumb"}
                                    items={[
                                        { title: "Casa Anáhuac"},
                                        { title: "M Ehrlich"},
                                        { title: "Dispositivos"},
                                    ]}
                        />
                        <Content className={"main-content"}>

                            <Routes>
                                {routes.map(({path, exact, Component}) =>
                                    <Route key={path} path={path} element={<Component/>}
                                           exact={exact !== false}/>
                                )}
                                <Route path="*" element={<Navigate replace to={routes[0].path}/>}/>
                            </Routes>

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    );
};

export default FancyHome;
