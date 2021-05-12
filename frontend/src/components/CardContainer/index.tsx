import React from 'react';
import { Row, Col, Typography, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import Card from "../Card";
import { ICardContainer } from "../../interfaces";
import "./index.css";

const CardContainer: React.FC<ICardContainer> = (props) => {

  const { Title } = Typography;

  return (
    <Row
      className="container-card"
      justify="center"
    >
      <Col
        span={24}
      >
        <Row
          justify="center"
          align="middle"
          style={{
            backgroundColor: "blue",
            padding: "10px",
          }}
        >
          <Title
            level={3}
            style={{
              color: "white",
              marginBottom: 0
            }}
          >
            {props.title}
          </Title>
        </Row>
        <Row
          align="middle"
          justify="center"
          gutter={[0, 8]}
          style={{
            backgroundColor: "#DDD"
          }}
        >
          <Col
            span={20}
          >
            {
              props.cards.map((card, index) => (
                <Card
                  key={index}
                  description={card.description}
                />
              ))
            }
          </Col>
          <Button
            onClick={() => props.setShowRegister && props.setShowRegister()}
            icon={<PlusCircleFilled />}
            style={{
              marginBottom: "10px",
            }}
          >
            Nova Card
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default CardContainer;