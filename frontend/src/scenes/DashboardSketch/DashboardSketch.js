import {Card, Collapse, theme, Typography} from "antd";
import {Liquid} from "@ant-design/charts";
import {RightOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import CollapsedCard from "../FancyHome/components/CollapsedCard/CollapsedCard";

const { Text } = Typography;

const DashboardSketch = () => {

    const { token } = theme.useToken();
    const [activeKey, setActiveKey] = useState([]);

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

    return <div className={"DashboardSketch"}>
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
            expandIconPosition={"end"}
            className={"collapse"}
            onChange={setActiveKey}
            style={{background:token.colorBgLayout}}
            items={getItems(panelStyle, <Liquid {...configLiquid} />, activeKey)}
        />
    </div>
}

export default DashboardSketch;

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
