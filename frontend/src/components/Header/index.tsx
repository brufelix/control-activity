import React from 'react';
import { Layout, Row, Col, Avatar, Dropdown, Menu, Typography } from 'antd';

import "./index.css";

const styleCol = { height: "100%" };

const Header: React.FC = () => {

  const { Header } = Layout;
  const { Text } = Typography;

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">
          Sair
        </a>
      </Menu.Item>
    </Menu>
  );

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
        gutter={[0, 0]}
        style={{ height: "100%", }}
      >
        <Col
          style={styleCol}
        >
          <Text
            className="title-header"
            style={{ color: "white", }}
          >
            Controle de <span>Atividades</span>
          </Text>
        </Col>
        <Col
          style={styleCol}
        >
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
          >
            <Avatar
              style={{
                backgroundColor: '#7265e6',
                verticalAlign: 'middle'
              }}
              size="large"
            >
              Bruno
            </Avatar>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}

export default Header;