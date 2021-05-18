import React, { useState, useEffect } from 'react';
import { Button, Input, Modal } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import api from "../../service";
import { IRegisterActivity } from "../../interfaces";
import "./index.css";

const RegisterActivity: React.FC<IRegisterActivity> = (props) => {

  const { _id, fetchData, position } = props;
  const { TextArea } = Input;

  const [visible, setVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);
  const [groupId, setGroupId] = useState(String);

  const registerActivity = () => {
    api.post("/activity", {
      groupId,
      description,
      position,
    })
      .then(() => setVisible(false))
      .then(() => setDescription(""))
      .then(() => fetchData && fetchData());
  };

  useEffect(() => {
    if (!groupId.trim())
      setGroupId(_id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        visible &&
        (
          <Modal
            title={"Cadastro de Atividade"}
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={[
              <Button
                key={0}
                type="default"
                onClick={() => setVisible(false)}
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição da atividade..."
              rows={2}
            />
          </Modal>
        )
      }
      <Button
        onClick={() => setVisible(true)}
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