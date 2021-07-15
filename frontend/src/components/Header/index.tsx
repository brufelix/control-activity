import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Layout, Row, Col, Avatar, Dropdown, Menu, Typography } from 'antd';

import "./index.css";

const styleCol = { height: "100%" };

const Header: React.FC = () => {
  const [user, setUser] = useState<{ valid: boolean, username: string }>({ valid: false, username: "?" });

  const history = useHistory();
  const { Header } = Layout;
  const { Text } = Typography;

  const handleSignout = () => {
    localStorage.removeItem("@isAutenticate");
    localStorage.removeItem("@selected_project");
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          href="/"
          onClick={() => handleSignout()}
        >
          Sair
        </a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("@isAutenticate"));

    if (data) {
      const { user } = data;
      setUser(user);
    }

  }, [])

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
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => { history.push("/"); history.go(0); }}
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
              {user
                ? user.username.split("")[0].toLocaleUpperCase()
                : "?"}
            </Avatar>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}

export default Header;