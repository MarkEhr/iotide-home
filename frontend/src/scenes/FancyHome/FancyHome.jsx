import React, {useState} from 'react';
import './FancyHome.scss';
import { Breadcrumb, Layout, Menu, Avatar, Typography, theme, Badge, Card, Collapse} from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, RightOutlined } from '@ant-design/icons';
import { Liquid } from '@ant-design/charts';
import CollapsedCard from "./components/CollapsedCard/CollapsedCard";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const sidebarItems = [{
    key: `key1`,
    icon: React.createElement(UserOutlined),
    label: `Casa Anáhuac`,
    children: [{
        key: 'subKey00',
        label: 'Dashboard',
    }, {
        key: 'subKey01',
        label: 'Dispositivos',
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
}];

const getItems = (panelStyle, liquid, activeKey) => [
    {
        key: 'collapse1',
        label: activeKey.includes('collapse1') ? <Text style={{fontSize: '2.5vmin'}}>Water Meter - Begonia Maculata</Text> : <CollapsedCard/>,
        children: liquid,
        style: panelStyle,
    },
    {
        key: 'collapse2',
        label: 'Light meter - Living room',
        children: <CollapsedCard/>,
        style: panelStyle,
    },
    {
        key: 'collapse3',
        label: 'This one does not measure anything',
        children: liquid,
        style: panelStyle,
    },
];

const FancyHome = () => {

    const { token } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    const [badgeCount, setBadgeCount] = useState(3);

    const [activeKey, setActiveKey] = useState([]);

    const handleAvatarClick = () => {
        setBadgeCount(badgeCount + 1);
    }

    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: '1px solid',
        borderColor: token.colorBorder,
    };

    const configLiquid = {
        percent: 0.3,
        style: {
            outlineBorder: 4,
            outlineDistance: 8,
            waveLength: 128,
        },
    };

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
                    <Sider
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
                    </Sider>
                    <Layout>
                        <Breadcrumb className={"breadcrumb"}>
                            <Breadcrumb.Item>Casa Anáhuac</Breadcrumb.Item>
                            <Breadcrumb.Item>M Ehrlich</Breadcrumb.Item>
                            <Breadcrumb.Item>Dispositivos</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content className={"main-content"}>
                            <Card
                                title="Water Meter - Begonia Maculata"
                                className={"card"}
                                extra={<div>More</div>}
                            >
                                <div className={"card-content"}>
                                    <p style={{width:"500px"}}>Card content</p>
                                    <Liquid {...configLiquid}/>
                                </div>
                            </Card>
                            <Collapse
                                bordered={false}
                                //defaultActiveKey={['collapse1']}
                                expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
                                expandIconPosition={"right"}
                                className={"collapse"}
                                onChange={setActiveKey}
                                style={{background:token.colorBgLayout}}
                                items={getItems(panelStyle, <Liquid {...configLiquid} />, activeKey)}
                            />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    );
};

export default FancyHome;
