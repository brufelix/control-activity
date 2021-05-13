import React, { useState } from 'react';
import { Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import { ICreateGroup } from "../../interfaces";
import api from "../../service";

const CreateGroup: React.FC<ICreateGroup> = (props) => {

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInput = () => {
    api.post("/group", { title: description })
      .then(() => props.fetchData && props.fetchData())
      .then(() => setInputVisible(false))
      .then(() => setDescription(""));
  };

  return (
    <>
      {
        !inputVisible && (
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
            placeholder="Título do grupo..."
            onPressEnter={() => handleEnterInput()}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            style={{
              maxWidth: 250,
              maxHeight: "30px"
            }}
          />
        )
      }
    </>
  );
}

export default CreateGroup;