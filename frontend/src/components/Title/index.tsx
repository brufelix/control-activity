import React, { useState, useEffect } from 'react';
import { Typography, Input, Row } from "antd";

import { ITitle } from "../../interfaces";
import api from "../../service";

const Title: React.FC<ITitle> = (props) => {

  const { Title } = Typography;

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);
  const [title, setTitle] = useState("");

  const handleEnterInput = () => {
    api.post("/group/update", { _id: props.id, newtitle: description })
      .then(() => props.fetchData && props.fetchData())
      .then(() => setInputVisible(false))
      .then(() => setDescription(""))
      .then(() => getTitle());
  };

  const getTitle = async () => {
    await api.post("/groupname", { _id: props.id })
      .then(res => setTitle(res.data));
  }

  useEffect(() => {
    if (!title.trim())
      getTitle();
    // eslint-disable-next-line
  }, [props.id]);

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        backgroundColor: "blue",
        padding: "10px",
      }}
    >
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
      {
        !inputVisible && (
          <Title
            onClick={() => setInputVisible(true)}
            level={3}
            style={{
              color: "white",
              marginBottom: 0
            }}
          >
            {title}
          </Title>
        )
      }
    </Row>
  );
}

export default Title;