import React, { useState } from 'react';
import { Input, Modal, Button, Row } from "antd";

import api from "../../service";
import { ICard } from "../../interfaces";

const Card: React.FC<ICard> = (props) => {

  const [showModal, setShowModal] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInputCard = () => {
    api.post("/activity/updateAct", {
      _id: props.groupId,
      activityId: props._id,
      data: description
    })
      .then(() => setDescription(""))
      .then(() => props.fetchData && props.fetchData())
      .then(() => setShowModal(false));
  };

  return (
    <>
      {
        showModal &&
        (
          <Modal
            title={"Alterar descrição da atividade"}
            visible={showModal}
            onCancel={() => { setShowModal(false); setDescription(""); }}
            footer={[
              <Button
                key={0}
                type="default"
                onClick={() => { setShowModal(false); setDescription(""); }}
              >
                Cancelar
              </Button>,
              <Button
                key={1}
                onClick={() => handleEnterInputCard()}
                type="primary"
              >
                Salvar
            </Button>
            ]}
            width={400}
          >
            <Input
              placeholder="Descrição da atividade..."
              onPressEnter={() => handleEnterInputCard()}
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              style={{ maxWidth: "100%", }}
            />
          </Modal>
        )
      }
      <Row
        onClick={() => setShowModal(true)}
        style={{ width: "100%", }}
        justify="center"
        align="middle"
      >
        {props.description}
      </Row>
    </>
  );
};

export default Card;