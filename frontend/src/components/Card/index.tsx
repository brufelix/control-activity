import React, { useState } from 'react';
import { Input, Modal, Button, Row, Col, Checkbox } from "antd";

import AddDeliveryDate from "../AddDeliveryDate";
import { compareDate, formatDate } from "../../utils";
import api from "../../service";
import { ICard } from "../../interfaces";
import "./index.css";

const Card: React.FC<ICard> = (props) => {

  const {
    description: desc, mainId, groupId, delivery,
    done, inResearch, fetchData, getSearchData,
  } = props;
  const { TextArea } = Input;

  const [showModal, setShowModal] = useState(Boolean);
  const [visible, setVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInputCard = () => {
    api.post("/activity/updateAct", {
      mainId,
      _id: groupId,
      data: description
    })
      .then(() => setDescription(""))
      .then(() => setShowModal(false))
      .then(() => inResearch
        ? getSearchData && getSearchData()
        : fetchData && fetchData()
      );
  };

  const markAsDone = (isChecked: boolean) => {
    const done = isChecked ? true : false;

    api.post(`/activity/done`, {
      mainId,
      _id: groupId,
      done,
    })
      .then(() => inResearch
        ? getSearchData && getSearchData()
        : fetchData && fetchData()
      );
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
                Fechar
              </Button>,
              <Button
                key={1}
                disabled={!description.trim()}
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
                placeholder="Nova descrição da atividade..."
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
            <AddDeliveryDate
              groupId={groupId}
              inResearch={inResearch}
              mainId={mainId}
              visible={visible}
              fetchData={() => fetchData()}
              getSearchData={() => getSearchData()}
              setVisible={(boolean) => setVisible(boolean)}
            />
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
            {desc}
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
            {
              delivery !== undefined && (
                <span
                  className="container-checkbox"
                  style={{
                    background: done
                      ? "rgb(116, 228, 116)"
                      : compareDate(delivery.slice(0, 10))
                        ? "rgb(255, 56, 56)"
                        : "white"
                  }}
                >
                  <Checkbox
                    onChange={(e) => markAsDone(e.target.checked)}
                    checked={done}
                  >
                    {formatDate(delivery)}
                  </Checkbox>
                </span>
              )
            }
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Card;