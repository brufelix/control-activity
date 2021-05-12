import React from 'react';
import { Row, Col } from "antd";

import CardContainer from "../../components/CardContainer";

const Home: React.FC = () => {

  const data = [
    {
      title: "Desenvolvimento",
      cards: [
        {
          description: "Perfil home"
        }
      ]
    }
  ];

  return (
    <Row
      gutter={[0, 8]}
      align="middle"
      justify="start"
    >
      <Col
        span={24}
      >
        {data.map((item, index) => (
          <CardContainer
            key={index}
            title={item.title}
            cards={item.cards}
          />
        ))}
      </Col>
    </Row>
  );
}

export default Home;