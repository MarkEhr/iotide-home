import React, {useState} from 'react';
import './FancyHome.scss';
import { Breadcrumb, Layout, Menu, Avatar, Typography, theme, Badge, Card, Collapse} from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Liquid } from '@ant-design/charts';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

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

const text = "Hello! This is a panel.";
const getItems = (panelStyle, liquid) => [
    {
        key: 'collapse1',
        label: 'Light meter - Living room',
        children: liquid,
        style: panelStyle,
    },
    {
        key: 'collapse2',
        label: 'Yet another meter',
        children: <p>{text}</p>,
        style: panelStyle,
    },
    {
        key: 'collapse3',
        label: 'This one does not measure anything',
        children: <p>{text}</p>,
        style: panelStyle,
    },
];

const FancyHome = () => {

    const { token } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    const [badgeCount, setBadgeCount] = useState(3);

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
                        <Text style={{fontSize: '5vmin'}}>IoTide Home</Text>
                    </div>
                    <div className={"header-container"}>
                        <Text style={{fontSize: '2vmin'}}>M Ehrlich</Text>
                        <Badge count={badgeCount}>
                            <Avatar icon={<UserOutlined />} onClick={handleAvatarClick}/>
                        </Badge>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['key1']}
                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={sidebarItems}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>Casa Anáhuac</Breadcrumb.Item>
                            <Breadcrumb.Item>M Ehrlich</Breadcrumb.Item>
                            <Breadcrumb.Item>Dispositivos</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 20,
                                margin: 0,
                                minHeight: 280,
                                borderRadius: token.borderRadiusLG,
                            }}
                        >
                            <Card
                                title="Water Meter - Begonia Maculata"
                                extra={<div>More</div>}
                                style={{
                                    width: '50vp',
                                }}
                            >
                                <div style={{display: "flex", height: 200, alignItems: "center", justifyContent: "space-between"}}>
                                    <p style={{display: "flex", height: "auto"}}>Card content</p>

                                    <Liquid {...configLiquid} />
                                </div>
                            </Card>
                            <div style={{height: 30}}/>
                            <Collapse
                                bordered={false}
                                defaultActiveKey={['collapse1']}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    background: token.colorBgLayout,
                                }}
                                items={getItems(panelStyle, <Liquid {...configLiquid} />)}
                            />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    );
};

export default FancyHome;
