import React, { useState, useEffect } from 'react';
import { Button, Input, Modal } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import api from "../../service";
import { IRegisterActivity } from "../../interfaces";
import "./index.css";

const RegisterActivity: React.FC<IRegisterActivity> = (props) => {

  const { TextArea } = Input;

  const [showRegister, setShowRegister] = useState(Boolean);
  const [modalDescription, setModalDescription] = useState(String);
  const [groupId, setGroupId] = useState(String);

  const registerActivity = () => {
    api.post("/activity", {
      groupId: groupId,
      description: modalDescription
    })
      .then(() => setShowRegister(false))
      .then(() => setModalDescription(""))
      .then(() => props.fetchData && props.fetchData());
  };

  useEffect(() => {
    if (!groupId.trim())
      setGroupId(props._id);
    // eslint-disable-next-line
  }, []);

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
                Salvar
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
      <Button
        onClick={() => setShowRegister(true)}
        icon={<PlusCircleFilled />}
        style={{
          marginBottom: "10px",
          width: "100%",
        }}
      >
        Nova Card
      </Button>
    </>
  );
};

export default RegisterActivity;