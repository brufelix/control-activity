import React from 'react';
import { Layout, Input, Badge, Row } from 'antd';
import { NotificationOutlined } from "@ant-design/icons";

import { IHeader } from "../../interfaces";

const Header: React.FC<IHeader> = (props) => {

  const { count } = props;
  const { Header } = Layout;
  const { Search } = Input;

  return (
    <Header
      style={{
        background: "#00003a",
        borderTop: "3px solid #005194"
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <Search
          style={{ maxWidth: "300px", }}
        />
        <Row
          style={{ height: "100%", }}
          justify="center"
          align="middle"
        >
          <NotificationOutlined
            style={{
              color: "white",
              fontSize: "16px",
              marginRight: "10px",
            }}
          />
          <Badge
            count={count}
          />
        </Row>
      </Row>
    </Header>
  );
}

export default Header;