import React from 'react';
import './CollapsedCard.scss';
import { Tiny } from '@ant-design/charts';
import { Typography } from "antd";
const { Text } = Typography;

const CollapsedCard = () => {

    const data = [
        264, 417, 438, 550, 309, 397, 450, 475, 563, 430, 525, 592, 492, 467, 513, 546, 650, 340, 539, 243, 226, 192,
    ].map((value, index) => ({ value, index }));

    const config = {
        data,
        width: 480,
        height: 93,
        padding: 0,
        shapeField: 'smooth',
        xField: 'index',
        yField: 'value',
        style: {
            fill: 'linear-gradient(-90deg, black 0%, lightgreen 100%)',
            fillOpacity: 0.6,
        },
    };

  return (
    <div className="CollapsedCard">
        <div >
            <Text style={{fontSize: '2.5vmin'}}>Water Meter - Begonia Maculata<br/></Text>
            <Text style={{fontSize: '1.5vmin'}}>
                Status: Online<br/>
                Last Update: 3 minutes ago<br/>
            </Text>
        </div>
        <div className={"small-chart-container"}>
            <Tiny.Area {...config} />
            <div className={"small-chart-text"}>72%</div>
        </div>
    </div>
  );
}

export default CollapsedCard;