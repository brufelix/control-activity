import React, { useState } from 'react';
import { Row, Col, Typography, Button, Input, Modal, } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import api from "../../service";
import Card from "../Card";
import { ICardContainer } from "../../interfaces";
import "./index.css";

const CardContainer: React.FC<ICardContainer> = (props) => {

  const { Title } = Typography;
  const { TextArea } = Input;

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);
  const [showRegister, setShowRegister] = useState(Boolean);
  const [modalDescription, setModalDescription] = useState(String);

  const registerActivity = () => {
    api.post("/activity", {
      groupId: props._id,
      description: modalDescription
    })
      .then(() => props.fetchData && props.fetchData())
      .then(() => setShowRegister(false))
      .then(() => setModalDescription(""));
  };

  const handleEnterInput = () => {
    api.post("/group/update", { _id: props._id, newtitle: description })
      .then(() => props.fetchData && props.fetchData())
      .then(() => setInputVisible(false))
      .then(() => setDescription(""));
  };

  return (
    <>
      {
        showRegister &&
        (
          <Modal
            title={"Cadastro de Atividade"}
            visible={showRegister}
            onCancel={() => setShowRegister(false)}
            footer={[
              <Button
                key={0}
                type="default"
                onClick={() => setShowRegister(false)}
              >
                Cancelar
            </Button>,
              <Button
                key={1}
                onClick={() => registerActivity()}
                type="primary"
              >
                Cadastrar
            </Button>
            ]}
            width={400}
          >
            <TextArea
              onChange={(e) => setModalDescription(e.target.value)}
              placeholder="Digite a descrição da atividade..."
              rows={2}
            />
          </Modal>
        )
      }
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
              onClick={() => setShowRegister(true)}
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
    </>
  );
};

export default CardContainer;