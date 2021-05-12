import React from 'react';
import { Row, Col, Typography } from "antd";

import Card from "../Card";
import { ICardContainer } from "../../interfaces";

const CardContainer: React.FC<ICardContainer> = (props) => {

  const { Title } = Typography;

  return (
    <Row>
      <Col>
        <Row>
          <Title level={3}>h3. Ant Design</Title>
        </Row>
        <Row>
          {
            props.cards.map(card => (
              <Card
                description={card.description}
              />
            ))
          }
        </Row>
      </Col>
    </Row>
  );
};

export default CardContainer;