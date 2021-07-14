import React, { useState } from 'react';
import { Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import { updateGroupPosition } from "../../functions/updateGroupPosition";
import { ICreateGroup } from "../../interfaces";
import api from "../../service";

const CreateGroup: React.FC<ICreateGroup> = (props) => {

  const { fetchData, position } = props;

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInput = () => {
    const projectId = localStorage.getItem("@selected_project");

    if (projectId) {
      try {
        updateGroupPosition()
          .then(() => {
            api.post("/group", { title: description, groupPosition: position, projectId })
              .then(() => setInputVisible(false))
              .then(() => setDescription(""))
              .then(() => fetchData && fetchData());
          });
      } catch (error) {
        throw error;
      }
    }
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
            onKeyUp={(e) => e.key === "Escape" && setInputVisible(false)}
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