import {Layout, Menu} from "antd";
import React, {useMemo, useState} from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {paths} from "../../../../services/routes/appRoutes";

const { Sider } = Layout;

const Sidebar = () => {

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);


    const sidebarItems = useMemo( ()=>[{
        key: `key1`,
        icon: React.createElement(UserOutlined),
        label: `Casa Anáhuac`,
        children: [{
            key: 'subKey00',
            label: 'Dashboard',
            onClick: () => navigate(paths.dash),
        }, {
            key: 'subKey01',
            label: 'Dispositivos',
            onClick: () => navigate(paths.home),
        }, {
            key: 'subKey02',
            label: 'Grupos',
        }]
    }, {
        key: `key2`,
        icon: React.createElement(NotificationOutlined),
        label: `Notificaciones`,
        children: [{
            key: 'subKey10',
            label: 'Alguna sección',
        }, {
            key: 'subKey11',
            label: 'Cosas que suceden',
        }]
    }, {
        key: `key3`,
        icon: React.createElement(LaptopOutlined),
        label: `Ajustes`,
        children: [{
            key: 'subKey20',
            label: 'Algunos ajustes',
        }, {
            key: 'subKey21',
            label: 'Más ajustes',
        }]
    }] ,[ navigate ]);


    return (<Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
    >
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['key1']}
            className={"menu"}
            items={sidebarItems}
        />
    </Sider>)
}

export default Sidebar;
