import React, { useState } from 'react';
import { Row, Col, Typography, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import api from "../../service";
import Card from "../Card";
import { ICardContainer } from "../../interfaces";
import "./index.css";

const CardContainer: React.FC<ICardContainer> = (props) => {

  const { Title } = Typography;

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInput = () => {
    api.post("/group/update", { _id: props._id, newtitle: description })
      .then(() => props.fetchData && props.fetchData())
      .then(() => setInputVisible(false))
      .then(() => setDescription(""));
  };

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
          {
            inputVisible && (
              <Input
                placeholder="Digite o título do grupo..."
                onPressEnter={() => handleEnterInput()}
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                style={{ maxWidth: 250, }}
              />
            )
          }
          {
            !inputVisible && (
              <Title
                onClick={() => setInputVisible(true)}
                level={3}
                style={{
                  color: "white",
                  marginBottom: 0
                }}
              >
                {props.title}
              </Title>
            )
          }
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
              props.activities.map((card, index) => (
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