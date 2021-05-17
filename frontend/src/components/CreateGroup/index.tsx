import React, { useState } from 'react';
import { Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import { ICreateGroup } from "../../interfaces";
import api from "../../service";

const CreateGroup: React.FC<ICreateGroup> = (props) => {

  const { fetchData } = props;

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInput = () => {
    api.post("/group", { title: description })
      .then(() => setInputVisible(false))
      .then(() => setDescription(""))
      .then(() => fetchData && fetchData());
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
            placeholder="Título do novo grupo..."
            onPressEnter={() => handleEnterInput()}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            style={{
              maxWidth: 250,
              maxHeight: "30px",
            }}
          />
        )
      }
    </>
  );
}

export default CreateGroup;