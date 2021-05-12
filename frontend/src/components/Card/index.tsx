import React, { useState } from 'react';
import { Card as CardAntd, Input, } from "antd";

import api from "../../service";
import { ICard } from "../../interfaces";

const Card: React.FC<ICard> = (props) => {

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInput = () => {
    api.post("/activity/updateAct", {
      _id: props.groupId,
      activityId: props._id,
      data: description
    })
      .then(() => setDescription(""))
      .then(() => props.fetchData && props.fetchData())
      .then(() => setInputVisible(false));
  };

  return (
    <CardAntd
      onClick={() => setInputVisible(true)}
      style={{
        width: "100%",
        margin: "10px 0 10px 0"
      }}
    >
      {
        inputVisible && (
          <Input
            placeholder="Digite a descrição da atividade..."
            onPressEnter={() => handleEnterInput()}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            style={{ maxWidth: 250, }}
          />
        )
      }
      {
        !inputVisible && (
          <p>{props.description}</p>
        )
      }
    </CardAntd>
  );
};

export default Card;