import React, { useState } from 'react';
import { Row, Modal, Input, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import { ICardContainer } from "../../interfaces";
import CardContainer from "../../components/CardContainer";

const Home: React.FC = () => {

  const { TextArea } = Input;

  const [showRegister, setShowRegister] = useState(Boolean);
  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);
  const [modalDescription, setModalDescription] = useState(String);
  const [data, setData] = useState<[ICardContainer]>();

  const registerActivity = () => {
    console.log(modalDescription);
  };

  const handleEnterInput = () => {
    setData([{ title: description, cards: [] }])
    setInputVisible(false);
    setDescription("");
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
        gutter={[0, 8]}
        align="top"
        justify="start"
        style={{
          height: "100%",
          padding: "20px"
        }}
      >
        {data &&
          (
            data.map((item, index) => (
              <div key={index} >
                <CardContainer
                  title={item.title}
                  cards={item.cards || []}
                  setShowRegister={() => setShowRegister(true)}
                />
              </div>
            ))
          )}
        {!inputVisible && (
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => setInputVisible(true)}
          >
            Novo Grupo
          </Button>
        )}
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
      </Row>
    </>
  );
}

export default Home;