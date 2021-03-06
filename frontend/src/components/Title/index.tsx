import React, { useState, useEffect } from 'react';
import { Typography, Input, Row } from "antd";

import { ITitle } from "../../interfaces";
import api from "../../service";
import "./index.css";

const Title: React.FC<ITitle> = (props) => {

  const { id: _id, fetchData } = props;
  const { Title } = Typography;

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);
  const [title, setTitle] = useState("");

  const handleEnterInput = () => {
    api.post("/group/update", { _id, newtitle: description })
      .then(() => fetchData && fetchData())
      .then(() => setInputVisible(false))
      .then(() => setDescription(""))
      .then(() => getTitle());
  };

  const getTitle = async () => {
    await api.post("/groupname", { _id })
      .then(res => setTitle(res.data));
  }

  useEffect(() => {
    getTitle();
    // eslint-disable-next-line
  }, [_id]);

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
            onKeyUp={(e) => e.key === "Escape" && setInputVisible(false)}
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
            title={title}
            className="group-title"
          >
            {title}
          </Title>
        )
      }
    </Row>
  );
}

export default Title;