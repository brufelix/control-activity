import React from 'react';
import { Card as CardAntd } from "antd";

import { ICard } from "../../interfaces";

const Card: React.FC<ICard> = (props) => {
  return (
    <CardAntd
      style={{
        width: "100%",
        margin: "10px 0 10px 0"
      }}
    >
      <p>{props.description}</p>
    </CardAntd>
  );
};

export default Card;