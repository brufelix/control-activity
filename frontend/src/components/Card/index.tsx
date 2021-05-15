import React, { useState } from 'react';
import {
  Input, Modal, Button, Row, Col, Popover, DatePicker, Checkbox
} from "antd";

import api from "../../service";
import { ICard } from "../../interfaces";

const Card: React.FC<ICard> = (props) => {

  const { TextArea } = Input;

  const [showModal, setShowModal] = useState(Boolean);
  const [visible, setVisible] = useState(Boolean);
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
                onClick={() => {
                  setShowModal(false);
                  setDescription("");
                  setVisible(false);
                }}
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
            <Row>
              <TextArea
                placeholder="Descrição da atividade..."
                onPressEnter={() => handleEnterInputCard()}
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                style={{
                  maxWidth: "100%",
                  marginBottom: "10px"
                }}
                rows={2}
              />
            </Row>
            <Row
              justify="start"
              align="middle"
            >
              <Popover
                content={
                  <DatePicker
                    format="DD/MM/YYYY"
                  />
                }
                trigger="click"
                visible={visible}
              >
                <Button
                  type="primary"
                  onClick={() => setVisible(!visible)}
                >
                  Data de Entrega
                </Button>
              </Popover>
            </Row>
          </Modal>
        )
      }
      <Row
        justify="start"
        gutter={[0, 8]}
        style={{ width: "100%", }}
      >
        <Col
          span={24}
        >
          <Row
            onClick={() => setShowModal(true)}
            style={{ width: "100%", }}
            justify="start"
            align="middle"
          >
            {props.description}
          </Row>
        </Col>
        <Col
          span={24}
        >
          <Row
            style={{ width: "100%", }}
            justify="start"
            align="middle"
          >
            <Checkbox>
              06 mai 21
            </Checkbox>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Card;