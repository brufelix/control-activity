import React, { useState } from 'react';
import { Row, Col, Modal, Input, Button } from "antd";

import CardContainer from "../../components/CardContainer";

const Home: React.FC = () => {

  const { TextArea } = Input;
  const [showRegister, setShowRegister] = useState(Boolean);

  const data = [
    {
      title: "Desenvolvimento",
      cards: [
        {
          description: "Perfil home"
        },
        {
          description: "Perfil home"
        },
        {
          description: "Perfil home"
        },
      ]
    }
  ];

  return (
    <>
      <Modal
        title={"Cadastro de Atividade"}
        visible={showRegister}
        onCancel={() => setShowRegister(false)}
        footer={[
          <Button
            type="default"
            onClick={() => setShowRegister(false)}
          >
            Cancelar
          </Button>,
          <Button
            type="primary"
          >
            Cadastrar
          </Button>
        ]}
        width={400}
      >
        <TextArea
          placeholder="Digite a descrição da atividade..."
          rows={3}
        />
      </Modal>
      <Row
        gutter={[0, 8]}
        align="top"
        justify="start"
        style={{
          height: "100%",
        }}
      >
        <Col
          span={24}
          style={{
            height: "100%",
          }}
        >
          {data.map((item, index) => (
            <CardContainer
              key={index}
              title={item.title}
              cards={item.cards}
              setShowRegister={() => setShowRegister(true)}
            />
          ))}
        </Col>
      </Row>
    </>
  );
}

export default Home;