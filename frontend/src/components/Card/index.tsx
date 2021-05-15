import React, { useState } from 'react';
import {
  Input, Modal, Button, Row, Col, Popover, DatePicker, Checkbox
} from "antd";
import moment from "moment";

import { compareDate } from "../../utils";
import api from "../../service";
import { ICard } from "../../interfaces";
import "./index.css";

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

  const formatDate = (date: string) => {
    const [year, mon, day] = date.slice(0, 10).split("-")
    moment.locale('pt');
    moment.updateLocale('pt', {
      months: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul",
        "Ago", "Set", "Out", "Nov", "Dez"
      ]
    });

    return moment([year, `${+mon - 1}`, day]).format('DD [de] MMMM/YYYY');
  };

  const addDeliveryData = (date: string) => {
    api.post(`/activity/delivery`, {
      _id: props.groupId,
      activityId: props._id,
      date
    })
      .then(() => props.fetchData && props.fetchData());
  };

  const markAsDone = (isChecked: boolean) => {
    const done = isChecked ? true : false;

    api.post(`/activity/done`, {
      done,
      _id: props.groupId,
      activityId: props._id
    })
      .then(() => props.fetchData && props.fetchData());
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
                    onSelect={(e) => {
                      addDeliveryData(
                        e.startOf('day')
                          .format("YYYY-MM-DDTHH:mm:ss-03:00")
                      );
                      setVisible(false);
                    }
                    }
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
            {
              props.delivery !== undefined && (
                <span
                  className="container-checkbox"
                  style={{
                    background: props.done
                      ? "rgb(116, 228, 116)"
                      : compareDate(props.delivery.slice(0, 10))
                        ? "rgb(255, 56, 56)"
                        : "white"
                  }}
                >
                  <Checkbox
                    onChange={(e) => markAsDone(e.target.checked)}
                    checked={props.done}
                  >
                    {formatDate(props.delivery)}
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