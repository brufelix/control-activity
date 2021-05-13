import React, { useState } from 'react';
import { Input } from "antd";

import api from "../../service";
import { ICard } from "../../interfaces";

const Card: React.FC<ICard> = (props) => {

  const [inputVisible, setInputVisible] = useState(Boolean);
  const [description, setDescription] = useState(String);

  const handleEnterInputCard = () => {
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
    <div onClick={() => setInputVisible(true)}>
      {
        inputVisible && (
          <Input
            placeholder="Descrição da atividade..."
            onPressEnter={() => handleEnterInputCard()}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            style={{ maxWidth: 250, }}
          />
        )
      }
      {
        !inputVisible && (
          <>
            {props.description}
          </>
        )
      }
    </div>
  );
};

export default Card;